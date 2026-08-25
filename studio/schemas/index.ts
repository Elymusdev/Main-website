import { defineField, defineType } from "sanity";
import { pageTypes } from "./pages";

/**
 * Content model for the Elymus site.
 *
 * `orderRank` drives display order everywhere, so an editor controls sequence
 * without renaming or re-dating anything. Lower numbers appear first.
 */

const orderRank = defineField({
  name: "orderRank",
  title: "Display order",
  type: "number",
  description: "Lower numbers appear first. Leave blank to fall back to the default order.",
});

export const newsItem = defineType({
  name: "newsItem",
  title: "News item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Kind",
      type: "string",
      description: "Shown before the source, e.g. “Research news” or “Podcast”.",
      initialValue: "Research news",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Publisher or programme, e.g. “University of Minnesota Medical School”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Link",
      type: "url",
      description: "Opens in a new tab.",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    orderRank,
  ],
  preview: {
    select: { title: "title", subtitle: "source" },
  },
});

export const publication = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Paper title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "journal",
      title: "Journal",
      type: "string",
      description: "e.g. “PNAS”, “Langmuir”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (rule) => rule.required().regex(/^\d{4}$/, { name: "four-digit year" }),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "string",
      description: "Formatted exactly as it should read, e.g. “Cohen, H.; Angulski, A.B.B.; et al.”",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detail",
      title: "Citation detail",
      type: "string",
      description: "Volume, issue, and article number, e.g. “122 (42), e2513599122”.",
    }),
    defineField({
      name: "url",
      title: "Link",
      type: "url",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
    orderRank,
  ],
  preview: {
    select: { title: "title", subtitle: "journal" },
  },
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "e.g. “Chief Executive Officer”, “Co-founder · Regents Professor”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "note",
      title: "Affiliation note",
      type: "string",
      description: "The smaller line under the name.",
    }),
    defineField({
      name: "group",
      title: "Section",
      type: "string",
      options: {
        list: [
          { title: "Leadership", value: "leadership" },
          { title: "Advisor", value: "advisor" },
        ],
        layout: "radio",
      },
      initialValue: "leadership",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Portrait",
      type: "image",
      description: "Square image works best. Replaces the file shipped with the site.",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagePath",
      title: "Built-in image path",
      type: "string",
      description: "Legacy path such as /team/tim.png. Used only when no portrait is uploaded.",
      readOnly: true,
      hidden: ({ document }) => Boolean(document?.image),
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    orderRank,
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});

export const schemaTypes = [newsItem, publication, teamMember, ...pageTypes];
