import { Resend } from "resend";
import { getContact, getSiteSettings } from "../../lib/content";

/**
 * Contact form endpoint.
 *
 * The form used to hand the visitor a `mailto:` link, which only worked if
 * they had a desktop mail client configured — on a phone or a webmail-only
 * machine the submit button did nothing and the inquiry was lost silently.
 * This sends the message server-side instead and tells the visitor what
 * happened either way.
 *
 * The destination address stays editable in the Studio (siteSettings
 * -> contactEmail), so it is read per request rather than baked in here.
 */

// Node runtime, not edge: this reads Sanity through the shared content layer.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Verified sending domain. The reply-to carries the visitor's own address. */
const FROM = "Elymus website <inquiries@elymus.bio>";

const LIMITS = { name: 120, organization: 160, email: 254, inquiry: 80, message: 5000 };

/**
 * One inquiry every 30s per address, and 5 per address per hour.
 *
 * Deliberately in-memory: Fluid Compute reuses an instance across requests, so
 * this absorbs a hammering submit button or a naive script without adding a
 * database. It is not a defence against a distributed flood — the honeypot and
 * Vercel's own protections cover the rest — and it resets on a cold start.
 */
const seen = new Map<string, number[]>();
const WINDOW = 60 * 60 * 1000;
const MIN_GAP = 30 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string) {
  const now = Date.now();
  const hits = (seen.get(key) ?? []).filter((t) => now - t < WINDOW);
  if (hits.length && now - hits[hits.length - 1] < MIN_GAP) return true;
  if (hits.length >= MAX_PER_WINDOW) return true;
  hits.push(now);
  seen.set(key, hits);
  // The map only ever holds addresses that submitted in the last hour.
  if (seen.size > 500) for (const [k, v] of seen) if (!v.some((t) => now - t < WINDOW)) seen.delete(k);
  return false;
}

const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

// Deliberately permissive: the address only has to be something Resend can put
// in a reply-to header, and over-strict patterns reject valid addresses.
const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // Honeypot: a real visitor never sees this field, so anything in it is a bot.
  // Answer 200 so the script believes it succeeded and does not retry.
  if (str(body.website, 100)) return Response.json({ ok: true });

  const name = str(body.name, LIMITS.name);
  const organization = str(body.organization, LIMITS.organization);
  const email = str(body.email, LIMITS.email);
  const inquiry = str(body.inquiry, LIMITS.inquiry) || "Website inquiry";
  const message = str(body.message, LIMITS.message);

  const missing = [
    !name && "name",
    !email && "email",
    !message && "message",
    email && !looksLikeEmail(email) && "email",
  ].filter(Boolean);
  if (missing.length) return Response.json({ error: "invalid", fields: missing }, { status: 400 });

  if (rateLimited(email.toLowerCase())) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  // Checked here rather than first, so a bot still gets its 200 from the
  // honeypot and a visitor still gets a useful 400 about their own input even
  // if the key is missing. A missing key is our problem, and only a submission
  // that would otherwise have been sent needs to hear about it.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[inquiry] RESEND_API_KEY is not set; cannot send.");
    return Response.json({ error: "unconfigured" }, { status: 503 });
  }

  const [settings, contact] = await Promise.all([getSiteSettings(), getContact()]);

  // Only accept an inquiry type the Studio actually offers, so the subject line
  // cannot be set to arbitrary text by posting to this endpoint directly.
  const type = contact.inquiryTypes.includes(inquiry) ? inquiry : "Website inquiry";

  const rows: [string, string][] = [
    ["Name", name],
    ["Organization", organization || "—"],
    ["Email", email],
    ["Inquiry type", type],
  ];

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", message].join("\n");

  const html = `<table style="border-collapse:collapse;font:14px/1.6 -apple-system,Segoe UI,sans-serif;color:#10233c">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:2px 16px 2px 0;color:#5e6c7b">${escape(k)}</td><td style="padding:2px 0">${escape(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="font:14px/1.6 -apple-system,Segoe UI,sans-serif;color:#10233c;white-space:pre-wrap;margin-top:20px">${escape(message)}</p>`;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to: settings.contactEmail,
      replyTo: email, // so hitting reply answers the person who wrote in
      subject: `Elymus website inquiry: ${type}`,
      text,
      html,
    });
    if (error) {
      console.error("[inquiry] Resend rejected the send:", error);
      return Response.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (cause) {
    console.error("[inquiry] Could not reach Resend:", cause);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}

function escape(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}
