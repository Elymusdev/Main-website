import type { Metadata } from "next";
import { ArrowIcon, Lines, PageShell } from "../components/SiteChrome";
import { getNews, getNewsPage } from "../lib/content";

// Rendered per request so CMS edits appear without a redeploy. Without this
// the page is statically prerendered and content is baked into the artifact.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News",
  description: "Independent coverage and conversations about the research behind Elymus.",
};

export default async function News() {
  const [c, items] = await Promise.all([getNewsPage(), getNews()]);
  return <PageShell>
    <section className="page-hero news-hero"><p className="eyebrow light">{c.heroEyebrow}</p><h1><Lines text={c.heroHeading} /></h1><p>{c.heroText}</p></section>
    <section className="news-list section-pad">{items.map((n, i) => <a href={n.url} target="_blank" rel="noreferrer" key={n._id ?? n.url}><span>{String(i + 1).padStart(2, "0")}</span><div><small>{n.type} · {n.source}</small><h2>{n.title}</h2></div><ArrowIcon /></a>)}</section>
  </PageShell>;
}
