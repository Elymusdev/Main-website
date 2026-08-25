import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, Lines, PageShell } from "../components/SiteChrome";
import { getPipeline } from "../lib/content";

// Rendered per request so CMS edits appear without a redeploy. Without this
// the page is statically prerendered and content is baked into the artifact.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pipeline",
  description: "Elymus is prioritizing Duchenne muscular dystrophy while building a platform for membrane-instability disorders.",
};

export default async function Pipeline() {
  const c = await getPipeline();
  return <PageShell>
    <section className="page-hero pipeline-hero"><p className="eyebrow light">{c.heroEyebrow}</p><h1><Lines text={c.heroHeading} /></h1><p>{c.heroText}</p></section>
    <section className="pipeline-main section-pad"><div className="pipeline-title"><span>{c.programLabel}</span><h2>{c.programHeading}</h2><p>{c.programText}</p></div><div className="pipeline-chart" aria-label="DMD program development stage"><div className="chart-labels">{c.chartStages.map((s) => <span key={s}>{s}</span>)}</div><div className="chart-track">{c.chartStages.map((s) => <i key={s}/>)}<b>{c.chartCurrentLabel}</b></div></div><div className="pipeline-detail">{c.programDetail.map((d) => <span key={d.label}><b>{d.label}</b>{d.text}</span>)}</div></section>
    <section className="dmd-background section-pad"><div className="dmd-copy"><p className="eyebrow">{c.dmdEyebrow}</p><h2>{c.dmdHeading}</h2><div className="dmd-narrative">{c.dmdBody.map((p, i) => <p key={i}>{p}</p>)}</div></div><div className="dmd-figures">{c.figures.map((f) => <figure key={f.src}><Image src={f.src} width={f.width} height={f.height} alt={f.alt}/><figcaption>{f.caption}</figcaption></figure>)}</div></section>
    <section className="horizon section-pad"><p className="eyebrow light">{c.horizonEyebrow}</p><h2>{c.horizonHeading}</h2><div className="horizon-grid">{c.horizonItems.map((h) => <span key={h.label}><b>{h.label}</b>{h.text}</span>)}</div><p className="disclosure">{c.horizonDisclosure}</p></section>
    <section className="page-cta section-pad"><h2>{c.ctaHeading}</h2><Link className="button primary" href="/contact">{c.ctaLabel} <ArrowIcon /></Link></section>
  </PageShell>;
}
