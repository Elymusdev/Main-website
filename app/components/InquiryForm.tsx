"use client";

import { useState, type FormEvent } from "react";

type Status = { state: "idle" | "sending" } | { state: "sent" } | { state: "error"; message: string };

/**
 * The form posts to /api/inquiry, which sends the message server-side.
 *
 * It previously built a `mailto:` link and set window.location — which only
 * reached anyone if the visitor had a desktop mail client configured. On a
 * phone, or in a webmail-only browser, submitting appeared to do nothing and
 * the inquiry was lost without either side knowing.
 *
 * Every failure path still ends with the address on screen, so a visitor whose
 * message could not be sent is never left without a way to reach us.
 */
export default function InquiryForm({
  inquiryTypes,
  contactEmail,
}: {
  inquiryTypes: string[];
  contactEmail: string;
}) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const sending = status.state === "sending";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          organization: data.get("organization"),
          email: data.get("email"),
          inquiry: data.get("inquiry"),
          message: data.get("message"),
          website: data.get("website"), // honeypot
        }),
      });

      if (response.ok) {
        form.reset();
        setStatus({ state: "sent" });
        return;
      }

      const { error } = await response.json().catch(() => ({ error: "" }));
      setStatus({ state: "error", message: messageFor(error, contactEmail) });
    } catch {
      setStatus({
        state: "error",
        message: `We could not reach the server. Please check your connection, or email ${contactEmail} directly.`,
      });
    }
  }

  return (
    <form className="inquiry-form" aria-label="Elymus contact form" onSubmit={submit}>
      <label>Full name<input type="text" name="name" autoComplete="name" required disabled={sending} /></label>
      <label>Organization<input type="text" name="organization" autoComplete="organization" disabled={sending} /></label>
      <label>Email address<input type="email" name="email" autoComplete="email" required disabled={sending} /></label>
      <label>Inquiry type<select name="inquiry" disabled={sending}>{inquiryTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
      <label className="form-wide">Message<textarea name="message" rows={6} required disabled={sending} /></label>

      {/*
        Honeypot. Hidden from sight and from screen readers, and skipped by
        tabbing, so only a script that fills every field will complete it.
        aria-hidden rather than `type="hidden"`, which bots recognise.
      */}
      <div className="honeypot" aria-hidden="true">
        <label>
          Do not fill this in
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="button primary" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Submit inquiry"}
      </button>

      {/*
        role="status" announces the outcome to a screen reader without moving
        focus. Always rendered so the live region exists before it has content,
        which is what lets assistive tech notice the change.
      */}
      <p className="form-status form-wide" role="status" aria-live="polite">
        {status.state === "sent" ? (
          <span className="form-status-ok">Thank you — your inquiry has been sent. We will be in touch.</span>
        ) : status.state === "error" ? (
          <span className="form-status-error">{status.message}</span>
        ) : null}
      </p>
    </form>
  );
}

function messageFor(error: string, contactEmail: string) {
  if (error === "rate_limited") {
    return "That inquiry has already been received. Please give us a moment before sending another.";
  }
  if (error === "invalid") {
    return "Please check that your name, a valid email address, and a message are all filled in.";
  }
  // "unconfigured" and "send_failed" are both our problem, not the visitor's.
  return `Something went wrong sending your inquiry. Please email ${contactEmail} directly and we will pick it up.`;
}
