/**
 * Apply the third round of September 2026 website feedback to Sanity.
 *
 *   cd studio && npx sanity exec scripts/apply-website-feedback-3.js --with-user-token
 *
 * The same edit is already in app/content/ (the shipped defaults), but Sanity
 * wins wherever a field is set there — which it is for dmdBody — so the live
 * site does not change until this runs.
 *
 * The patch matches on the current value and rewrites it, so running twice is
 * a no-op and an edit made in the Studio in the meantime is reported rather
 * than silently overwritten.
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });

/**
 * Field edits, keyed by document id. A value is either a literal replacement
 * pair, or a function that receives the current value and returns the new one.
 */
const edits = [
  {
    id: "pipelinePage",
    fields: {
      // "abnormal calcium entry" -> "excessive calcium entry", in the DMD
      // background paragraph.
      dmdBody: (body) =>
        body.map((p) =>
          p.replace(
            "vulnerable to disruption and abnormal calcium entry.",
            "vulnerable to disruption and excessive calcium entry.",
          ),
        ),
    },
  },
];

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

let changed = 0;
let skipped = 0;

for (const { id, fields } of edits) {
  const doc = await client.getDocument(id);
  if (!doc) {
    console.warn(`! ${id}: document not found, skipping`);
    continue;
  }

  const set = {};
  for (const [field, rule] of Object.entries(fields)) {
    const current = doc[field];
    if (current === undefined) {
      console.warn(`  ~ ${id}.${field}: not set in Sanity (site uses the shipped default)`);
      continue;
    }
    const next = typeof rule === "function" ? rule(current) : current === rule[0] ? rule[1] : current;
    if (same(current, next)) {
      skipped += 1;
      console.log(`  = ${id}.${field}: already up to date or edited since — left alone`);
      continue;
    }
    set[field] = next;
  }

  if (Object.keys(set).length === 0) continue;

  await client.patch(id).set(set).commit();
  changed += Object.keys(set).length;
  for (const field of Object.keys(set)) console.log(`  + ${id}.${field}: updated`);
}

console.log(`\n${changed} field(s) updated, ${skipped} already current.`);
