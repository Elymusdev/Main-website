/**
 * Emits the site's existing content as NDJSON for `sanity dataset import`.
 *
 *   npm run cms:seed
 *
 * Import runs through the Sanity CLI, which uses the login from `sanity login`,
 * so no API token is needed — nothing secret is handled here or deployed.
 *
 * Documents use deterministic _ids derived from their URL or name, and the
 * import runs with --missing, so re-running never duplicates entries or
 * overwrites edits made in the Studio.
 */
import { writeFileSync } from "node:fs";
import { newsSeed, publicationsSeed, teamSeed } from "../app/content/seed.ts";

const outPath = process.argv[2] ?? "studio/.seed.ndjson";

/** Stable, readable document id derived from a source URL or name. */
const slug = (value) =>
  value.toLowerCase().replace(/^https?:\/\//, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

const docs = [
  ...newsSeed.map((n, i) => ({
    _id: `news-${slug(n.url)}`,
    _type: "newsItem",
    orderRank: i + 1,
    type: n.type,
    source: n.source,
    title: n.title,
    url: n.url,
  })),
  ...publicationsSeed.map((p, i) => ({
    _id: `pub-${slug(p.url)}`,
    _type: "publication",
    orderRank: i + 1,
    year: p.year,
    journal: p.journal,
    title: p.title,
    authors: p.authors,
    detail: p.detail,
    url: p.url,
  })),
  ...teamSeed.map((m, i) => ({
    _id: `team-${slug(m.name)}`,
    _type: "teamMember",
    orderRank: i + 1,
    name: m.name,
    role: m.role,
    note: m.note,
    group: m.group,
    linkedin: m.linkedin,
    // Portraits stay as the files shipped with the site until someone
    // uploads a replacement in the Studio.
    imagePath: m.image,
  })),
];

writeFileSync(outPath, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");

const counts = docs.reduce((acc, d) => ({ ...acc, [d._type]: (acc[d._type] ?? 0) + 1 }), {});
console.log(`Wrote ${docs.length} documents to ${outPath}`);
for (const [type, n] of Object.entries(counts)) console.log(`  ${type}: ${n}`);
