/**
 * Apply the copy changes from the September 2026 website feedback form to Sanity.
 *
 *   cd studio && npx sanity exec scripts/apply-website-feedback.js --with-user-token
 *
 * The same edits are already in app/content/ (the shipped defaults), but Sanity
 * wins wherever a field is set there — which it is for every field below — so
 * the live site does not change until this runs.
 *
 * Every patch matches on the current value and rewrites it, so running twice is
 * a no-op and an edit made in the Studio in the meantime is reported rather
 * than silently overwritten.
 */
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-01-01" });

const OLD_MOA_DESCRIPTION =
  "Three hypotheses for what the polymer may do on the lipid bilayer: patch, repair, and heal.";
const NEW_MOA_DESCRIPTION =
  "Hypothesis on action of the macromolecule on the lipid bilayer: patch, repair and heal.";

/**
 * Field edits, keyed by document id. A value is either a literal replacement
 * pair, or a function that receives the current value and returns the new one.
 */
const edits = [
  {
    id: "homePage",
    fields: {
      moaHeading: ["Elymer proposed mechanism of action", "Elymer™ proposed mechanism of action"],
      moaDescription: [OLD_MOA_DESCRIPTION, NEW_MOA_DESCRIPTION],
    },
  },
  {
    id: "sciencePage",
    fields: {
      moaHeading: ["Elymer proposed mechanism of action", "Elymer™ proposed mechanism of action"],
      moaDescription: [OLD_MOA_DESCRIPTION, NEW_MOA_DESCRIPTION],
      bandHeading: [
        "Elymers are engineered bottlebrush macromolecules designed to combine nanoscale architecture with membrane engagement",
        "Elymers™ are engineered bottlebrush macromolecules designed to combine nanoscale architecture with membrane engagement",
      ],
      primerBody: (body) =>
        body.map((p) => p.replace(/^That damage allows/, "This damage allows")),
      features: (features) =>
        features.map((f) =>
          f.label === "Engagement"
            ? { ...f, text: f.text.replace("Amphiphilic domains", "Amphiphilic structures") }
            : f,
        ),
    },
  },
  {
    id: "pipelinePage",
    fields: {
      dmdBody: (body) =>
        body
          .map((p) => p.replace("in a gene that result in absent", "in a gene that results in absent"))
          .map((p) =>
            p.replace(
              "of DMD biology, independent of an individual mutation.",
              "of DMD biology, which is mutation agnostic.",
            ),
          ),
      horizonItems: (items) =>
        items.map((item) => {
          const label = {
            "Muscular dystrophies": "DMD",
            "Ischemic reperfusion injury": "Other Muscular Dystrophies",
            "Post trauma related injuries": "Undisclosed",
          }[item.label];
          return label ? { ...item, label } : item;
        }),
    },
  },
  {
    id: "publicationsPage",
    fields: {
      heroText: [
        "Selected work underpinning the molecular architecture, membrane interaction, and preclinical promise of bottlebrush macromolecules.",
        "Selected work underpinning the molecular architecture, membrane interaction, and the preclinical promise of bottlebrush macromolecules.",
      ],
    },
  },
  {
    id: "team-nithya-iyer-singh",
    fields: {
      role: ["Chief Executive Officer", "CEO & Co-founder"],
      note: ["Co-founder, 2123iX · GSK, Tesaro, Medco", "Co-founder: 2123iX, GSK, Tesaro, Medco"],
    },
  },
  {
    id: "team-joe-metzger",
    fields: {
      role: ["Professor; Dept. Head & Chair", "Professor: Dept. Head & Chair"],
    },
  },
  {
    id: "team-demetris-yannopoulos-md",
    fields: {
      note: [
        "Research Director, Interventional Cardiology; Director, Resuscitation Medicine",
        "Research Director: Interventional Cardiology; Director: Resuscitation Medicine",
      ],
    },
  },
];

/** Fields the site no longer renders, removed so the Studio stops offering them. */
const unsets = { contactPage: ["topics"] };

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

  const unset = (unsets[id] ?? []).filter((field) => doc[field] !== undefined);
  if (Object.keys(set).length === 0 && unset.length === 0) continue;

  await client.patch(id).set(set).unset(unset).commit();
  changed += Object.keys(set).length + unset.length;
  for (const field of Object.keys(set)) console.log(`  + ${id}.${field}: updated`);
  for (const field of unset) console.log(`  - ${id}.${field}: removed`);
}

for (const [id, fields] of Object.entries(unsets)) {
  if (edits.some((e) => e.id === id)) continue;
  const doc = await client.getDocument(id);
  const unset = fields.filter((field) => doc?.[field] !== undefined);
  if (unset.length === 0) continue;
  await client.patch(id).unset(unset).commit();
  changed += unset.length;
  for (const field of unset) console.log(`  - ${id}.${field}: removed`);
}

console.log(`\n${changed} field(s) updated, ${skipped} already current.`);
