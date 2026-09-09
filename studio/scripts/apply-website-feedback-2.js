/**
 * Apply the second round of September 2026 website feedback to Sanity.
 *
 *   cd studio && npx sanity exec scripts/apply-website-feedback-2.js --with-user-token
 *
 * The same edits are already in app/content/ (the shipped defaults), but Sanity
 * wins wherever a field is set there — which it is for most fields below — so
 * the live site does not change until this runs.
 *
 * Every patch matches on the current value and rewrites it, so running twice is
 * a no-op and an edit made in the Studio in the meantime is reported rather
 * than silently overwritten.
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });

/** The mechanism heading is set on both pages; the break keeps "of action" together. */
const MOA_HEADING = [
  "Elymer™ proposed mechanism of action",
  "Elymer™ proposed mechanism\nof action",
];

/**
 * Field edits, keyed by document id. A value is either a literal replacement
 * pair, or a function that receives the current value and returns the new one.
 */
const edits = [
  {
    id: "homePage",
    fields: {
      heroLede: [
        "Elymus is engineering bottlebrush macromolecules designed to stabilize damaged muscle cell membranes, starting with Duchenne muscular dystrophy.",
        "Elymus is engineering bottlebrush macromolecules designed to stabilize damaged muscle cell membranes, starting with Duchenne muscular dystrophy (DMD).",
      ],
      podcastHeading: [
        "Bottlebrush block copolymer shields muscles and prevents DMD onset",
        "Bottlebrush macromolecule stabilizes damaged muscle membrane in DMD",
      ],
      moaHeading: MOA_HEADING,
    },
  },
  {
    id: "sciencePage",
    fields: {
      moaHeading: MOA_HEADING,
    },
  },
  {
    id: "team-nithya-iyer-singh",
    fields: {
      note: [
        "Co-founder: 2123iX, GSK, Tesaro, Medco",
        "Co-founder: 2123iX and 2123 Frontiers\nGSK, Tesaro and Medco",
      ],
    },
  },
  {
    id: "team-navjot-singh",
    fields: {
      name: ["Navjot Singh", "Navjot (Nav) Singh"],
      note: [
        "Co-founder & CEO, 2123iX; Senior Partner Emeritus, McKinsey",
        "Co-founder & CEO: 2123iX, 2123Q\nSenior Partner Emeritus, McKinsey",
      ],
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
