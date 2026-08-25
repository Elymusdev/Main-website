/**
 * One-time import of the site's existing content into Sanity.
 *
 *   SANITY_PROJECT_ID=xxxx SANITY_WRITE_TOKEN=sk... node scripts/seed-sanity.mjs
 *
 * Create the token at sanity.io/manage → API → Tokens with Editor permission.
 * It is used only here, from your machine — the site never needs a token.
 *
 * Safe to re-run: documents use deterministic _ids and are created only if
 * missing (`createIfNotExists`), so re-running never duplicates or overwrites
 * edits made in the Studio. Pass --replace to force-overwrite instead.
 */
import { createClient } from "@sanity/client";
import { newsSeed, publicationsSeed, teamSeed } from "../app/content/seed.ts";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;
const replace = process.argv.includes("--replace");

if (!projectId || !token) {
  console.error("Set SANITY_PROJECT_ID and SANITY_WRITE_TOKEN before running this script.");
  process.exit(64);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2025-01-01", useCdn: false });

/** Stable, readable document id derived from a source URL or name. */
const slug = (value) =>
  value.toLowerCase().replace(/^https?:\/\//, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

const docs = [
  ...newsSeed.map((n, i) => ({ _id: `news-${slug(n.url)}`, _type: "newsItem", orderRank: i + 1, ...n })),
  ...publicationsSeed.map((p, i) => ({ _id: `pub-${slug(p.url)}`, _type: "publication", orderRank: i + 1, ...p })),
  ...teamSeed.map((m, i) => ({
    _id: `team-${slug(m.name)}`,
    _type: "teamMember",
    orderRank: i + 1,
    name: m.name,
    role: m.role,
    note: m.note,
    group: m.group,
    linkedin: m.linkedin,
    // Portraits stay as shipped files until someone uploads a replacement in the Studio.
    imagePath: m.image,
  })),
];

const tx = docs.reduce((t, doc) => (replace ? t.createOrReplace(doc) : t.createIfNotExists(doc)), client.transaction());

try {
  await tx.commit();
  const counts = docs.reduce((acc, d) => ({ ...acc, [d._type]: (acc[d._type] ?? 0) + 1 }), {});
  console.log(`Imported into ${projectId}/${dataset} (${replace ? "replace" : "create-if-missing"}):`);
  for (const [type, n] of Object.entries(counts)) console.log(`  ${type}: ${n}`);
  console.log("\nNext: set SANITY_PROJECT_ID in app/lib/sanity.ts, then reload the site.");
} catch (error) {
  console.error("Import failed:", error.message);
  process.exit(1);
}
