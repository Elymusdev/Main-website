import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Page copy. Each page is a singleton document with a fixed _id matching the
 * accessor in app/lib/content.ts (homePage, sciencePage, …).
 *
 * Any field an editor leaves blank falls back to the copy shipped in
 * app/content/pages.ts, so clearing a field never blanks the live site.
 *
 * Headings marked "line breaks allowed" render each new line as <br/>.
 */

const str = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "string", description });

const txt = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "text", rows: 3, description });

const heading = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "text",
    rows: 2,
    description: "Line breaks allowed — each new line renders on its own line.",
  });

/** Repeating {label, text} pair used by several sections. */
const labelled = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "array",
    description,
    of: [
      defineArrayMember({
        type: "object",
        fields: [str("label", "Label"), str("text", "Text")],
        preview: { select: { title: "label", subtitle: "text" } },
      }),
    ],
  });

/** Upload field. Leaving it empty keeps the image shipped with the site. */
const image = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    description: description ?? "Leave empty to keep the image shipped with the site.",
  });

const strings = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "string" })], description });

const paragraphs = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "text", rows: 4 })], description });

/** Singletons show a fixed name in the Studio rather than a document title. */
const singleton = (name: string, title: string, fields: ReturnType<typeof defineField>[]) =>
  defineType({
    name,
    title,
    type: "document",
    fields,
    preview: { prepare: () => ({ title }) },
  });

export const homePage = singleton("homePage", "Home page", [
  heading("heroHeading", "Hero heading"),
  str("heroAccent", "Hero highlighted words", "Rendered in the accent colour after the heading."),
  txt("heroLede", "Hero intro paragraph"),
  str("heroPrimaryCta", "Primary button label"),
  str("heroSecondaryCta", "Secondary button label"),
  labelled("heroProof", "Hero proof points", "The three bold-plus-text items under the buttons."),
  image("heroImage", "Hero image", "The bottlebrush illustration beside the headline. Leave empty to keep the shipped image."),
  heading("heroArtCaption", "Hero image caption"),
  str("introEyebrow", "Intro eyebrow"),
  str("introHeading", "Intro heading"),
  txt("introBodyBefore", "Intro text (before “Elymers”)", "The branded “macromolecules, Elymers,” phrase is fixed in the design."),
  txt("introBodyAfter", "Intro text (after “Elymers”)"),
  str("introLink", "Intro link label"),
  str("moaEyebrow", "Mechanism eyebrow"),
  str("moaHeading", "Mechanism heading"),
  txt("moaDescription", "Mechanism description"),
  defineField({
    name: "cards",
    title: "Platform cards",
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields: [str("number", "Number", "e.g. 01"), str("title", "Title"), txt("text", "Text")],
        preview: { select: { title: "title", subtitle: "number" } },
      }),
    ],
  }),
  str("stripEyebrow", "Lead programme eyebrow"),
  str("stripHeading", "Lead programme heading"),
  txt("stripText", "Lead programme text"),
  defineField({
    name: "stripStages",
    title: "Mini pipeline stages",
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields: [
          str("label", "Stage label"),
          defineField({
            name: "state",
            title: "State",
            type: "string",
            options: {
              list: [
                { title: "Complete", value: "done" },
                { title: "Current", value: "current" },
                { title: "Upcoming", value: "" },
              ],
              layout: "radio",
            },
          }),
        ],
        preview: { select: { title: "label", subtitle: "state" } },
      }),
    ],
  }),
  heading("closingHeading", "Closing heading"),
  str("closingCta", "Closing button label"),
]);

export const sciencePage = singleton("sciencePage", "Science page", [
  str("heroEyebrow", "Hero eyebrow"),
  heading("heroHeading", "Hero heading"),
  txt("heroText", "Hero text"),
  str("primerEyebrow", "Primer eyebrow"),
  str("primerHeading", "Primer heading"),
  paragraphs("primerBody", "Primer paragraphs"),
  str("bandEyebrow", "Platform eyebrow"),
  txt("bandHeading", "Platform heading"),
  labelled("features", "Platform features"),
  str("moaEyebrow", "Mechanism eyebrow"),
  str("moaHeading", "Mechanism heading"),
  txt("moaDescription", "Mechanism description"),
  str("evidenceEyebrow", "Evidence eyebrow"),
  str("evidenceHeading", "Evidence heading"),
  strings("evidenceSteps", "Evidence steps", "Numbered automatically in order."),
]);

export const pipelinePage = singleton("pipelinePage", "Pipeline page", [
  str("heroEyebrow", "Hero eyebrow"),
  heading("heroHeading", "Hero heading"),
  txt("heroText", "Hero text"),
  str("programLabel", "Programme label"),
  str("programHeading", "Programme heading"),
  txt("programText", "Programme text"),
  strings("chartStages", "Chart stages", "Stage names along the development chart."),
  str("chartCurrentLabel", "Current-stage label"),
  labelled("programDetail", "Programme detail", "Modality, target, stage."),
  str("dmdEyebrow", "DMD background eyebrow"),
  txt("dmdHeading", "DMD background heading"),
  paragraphs("dmdBody", "DMD background paragraphs"),
  defineField({
    name: "figures",
    title: "Figures",
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields: [
          image("image", "Figure image", "Upload to replace the shipped figure."),
          str("src", "Shipped image path", "Used only when no figure image is uploaded."),
          txt("alt", "Alt text", "Describes the image for screen readers. Required for accessibility."),
          txt("caption", "Caption"),
          defineField({ name: "width", title: "Width (px)", type: "number" }),
          defineField({ name: "height", title: "Height (px)", type: "number" }),
        ],
        preview: { select: { title: "caption", subtitle: "src" } },
      }),
    ],
  }),
  str("horizonEyebrow", "Horizon eyebrow"),
  txt("horizonHeading", "Horizon heading"),
  labelled("horizonItems", "Horizon items"),
  txt("horizonDisclosure", "Horizon disclosure"),
  str("ctaHeading", "Closing heading"),
  str("ctaLabel", "Closing button label"),
]);

export const aboutPage = singleton("aboutPage", "About page", [
  str("heroEyebrow", "Hero eyebrow"),
  heading("heroHeading", "Hero heading"),
  txt("heroText", "Hero text"),
  str("leadershipEyebrow", "Leadership eyebrow"),
  str("leadershipHeading", "Leadership heading"),
  str("advisorsEyebrow", "Advisors eyebrow"),
  str("advisorsHeading", "Advisors heading"),
  str("valuesEyebrow", "Values eyebrow"),
  str("valuesHeading", "Values heading"),
  txt("valuesText", "Values text"),
]);

export const contactPage = singleton("contactPage", "Contact page", [
  str("heroEyebrow", "Hero eyebrow"),
  heading("heroHeading", "Hero heading"),
  txt("heroText", "Hero text"),
  str("introEyebrow", "Intro eyebrow"),
  str("introHeading", "Intro heading"),
  txt("introText", "Intro text"),
  strings("topics", "Topic chips", "The pills shown beside the form."),
  strings("inquiryTypes", "Inquiry dropdown options", "Options in the form's “Inquiry type” menu."),
  defineField({
    name: "audiences",
    title: "Audience notes",
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields: [str("heading", "Heading"), txt("text", "Text")],
        preview: { select: { title: "heading" } },
      }),
    ],
  }),
  str("disclosureHeading", "Disclosure heading"),
  txt("disclosureText", "Disclosure text"),
]);

export const newsPage = singleton("newsPage", "News page", [
  str("heroEyebrow", "Hero eyebrow"),
  heading("heroHeading", "Hero heading"),
  txt("heroText", "Hero text"),
]);

export const publicationsPage = singleton("publicationsPage", "Publications page", [
  str("heroEyebrow", "Hero eyebrow"),
  heading("heroHeading", "Hero heading"),
  txt("heroText", "Hero text"),
  txt("note", "Footnote", "The paragraph below the publication list."),
]);

export const siteSettings = singleton("siteSettings", "Site settings", [
  txt("footerTagline", "Footer tagline"),
  txt("footerFinePrint", "Footer fine print", "The regulatory disclaimer in the footer of every page."),
  str("contactEmail", "Contact email", "Where the contact form sends inquiries."),
  image("logo", "Header logo", "The mark beside “elymus” in the header on every page."),
  image("moaImage", "Mechanism diagram", "The mechanism-of-action image shown on the Home and Science pages."),
]);

export const pageTypes = [
  homePage,
  sciencePage,
  pipelinePage,
  aboutPage,
  contactPage,
  newsPage,
  publicationsPage,
  siteSettings,
];
