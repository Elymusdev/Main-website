import type { Metadata } from "next";
import MoaExplorer from "../components/MoaExplorer";
import { Lines, PageShell } from "../components/SiteChrome";
import { getScience, getSiteSettings } from "../lib/content";

// Rendered per request so CMS edits appear without a redeploy. Without this
// the page is statically prerendered and content is baked into the artifact.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Science",
  description: "How Elymer bottlebrush macromolecules are engineered to engage and stabilize the muscle cell membrane.",
};

export default async function Science() {
  const [c, settings] = await Promise.all([getScience(), getSiteSettings()]);
  return <PageShell>
    <section className="page-hero science-hero"><p className="eyebrow light">{c.heroEyebrow}</p><h1><Lines text={c.heroHeading} /></h1><p>{c.heroText}</p></section>
    <section className="science-primer section-pad"><div><p className="eyebrow">{c.primerEyebrow}</p><h2>{c.primerHeading}</h2></div><div>{c.primerBody.map((p, i) => <p key={i}>{p}</p>)}</div></section>
    <section className="science-band section-pad"><p className="eyebrow light">{c.bandEyebrow}</p><h2>{c.bandHeading}</h2><div className="feature-row">{c.features.map((f) => <article key={f.label}><b>{f.label}</b><p>{f.text}</p></article>)}</div></section>
    <section className="moa-home section-pad"><div className="section-heading"><p className="eyebrow light">{c.moaEyebrow}</p><h2>{c.moaHeading}</h2><p>{c.moaDescription}</p></div><MoaExplorer compact variant="hypotheses" image={settings.moaImage} /></section>
    <section className="evidence section-pad"><div><p className="eyebrow">{c.evidenceEyebrow}</p><h2>{c.evidenceHeading}</h2></div><div className="evidence-steps">{c.evidenceSteps.map((step, i) => <span key={step}><b>{String(i + 1).padStart(2, "0")}</b>{step}</span>)}</div></section>
  </PageShell>;
}
