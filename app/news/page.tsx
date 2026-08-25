import type { Metadata } from "next";
import { ArrowIcon, PageShell } from "../components/SiteChrome";
import { getNews } from "../lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "Independent coverage and conversations about the research behind Elymus.",
};

export default async function News() {
  const items = await getNews();
  return <PageShell>
    <section className="page-hero news-hero"><p className="eyebrow light">News &amp; perspectives</p><h1>Following the science<br/>as it advances</h1><p>Independent coverage and conversations about the research behind Elymus.</p></section>
    <section className="news-list section-pad">{items.map((n, i) => <a href={n.url} target="_blank" rel="noreferrer" key={n._id ?? n.url}><span>{String(i + 1).padStart(2, "0")}</span><div><small>{n.type} · {n.source}</small><h2>{n.title}</h2></div><ArrowIcon /></a>)}</section>
  </PageShell>;
}
