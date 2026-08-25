import type { Metadata } from "next";
import { ArrowIcon, Lines, PageShell } from "../components/SiteChrome";
import { getPublications, getPublicationsPage } from "../lib/content";

// Rendered per request so CMS edits appear without a redeploy. Without this
// the page is statically prerendered and content is baked into the artifact.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Publications",
  description: "Peer-reviewed research underpinning the molecular architecture and membrane interaction of bottlebrush macromolecules.",
};

export default async function Publications() {
  const [c, papers] = await Promise.all([getPublicationsPage(), getPublications()]);
  return <PageShell>
    <section className="page-hero publication-hero"><p className="eyebrow light">{c.heroEyebrow}</p><h1><Lines text={c.heroHeading} /></h1><p>{c.heroText}</p></section>
    <section className="publication-list section-pad">{papers.map((p) => <article key={p._id ?? p.url}><div><span>{p.year}</span><b>{p.journal}</b></div><div><div className="publication-title-row"><h2>{p.title}</h2><a href={p.url} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}><ArrowIcon /></a></div><p>{p.authors}</p><small>{p.detail}</small></div></article>)}</section>
    {c.note ? <section className="publication-note section-pad"><p>{c.note}</p></section> : null}
  </PageShell>;
}
