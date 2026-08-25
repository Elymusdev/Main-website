import type { StructureResolver } from "sanity/structure";

/**
 * Studio navigation.
 *
 * Page copy lives in singleton documents, so they are listed as fixed items
 * that open the single document directly — an editor can't accidentally create
 * a second "Home page". The _id here must match the accessors in
 * app/lib/content.ts.
 */

const singletons: { id: string; title: string }[] = [
  { id: "homePage", title: "Home page" },
  { id: "sciencePage", title: "Science page" },
  { id: "pipelinePage", title: "Pipeline page" },
  { id: "aboutPage", title: "About page" },
  { id: "contactPage", title: "Contact page" },
  { id: "newsPage", title: "News page" },
  { id: "publicationsPage", title: "Publications page" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("News")
        .child(S.documentTypeList("newsItem").title("News")),
      S.listItem()
        .title("Publications")
        .child(S.documentTypeList("publication").title("Publications")),
      S.listItem()
        .title("Team")
        .child(S.documentTypeList("teamMember").title("Team")),
      S.divider(),
      ...singletons.map(({ id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(id).documentId(id).title(title)),
      ),
      S.divider(),
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site settings")),
    ]);
