import Image from "next/image";
import Link from "next/link";
import MoaExplorer from "./components/MoaExplorer";
import { ArrowIcon, Lines, PageShell } from "./components/SiteChrome";
import { getHome } from "./lib/content";

// Rendered per request so CMS edits appear without a redeploy. Without this
// the page is statically prerendered and content is baked into the artifact.
export const dynamic = "force-dynamic";

export default async function Home() {
  const c = await getHome();
  return (
    <PageShell>
      <section className="hero">
        <div className="hero-copy">
          <h1>{c.heroHeading} <span className="hero-accent">{c.heroAccent}</span></h1>
          <p className="lede">{c.heroLede}</p>
          <div className="button-row"><Link className="button primary" href="/science">{c.heroPrimaryCta} <ArrowIcon /></Link><Link className="button ghost" href="/pipeline">{c.heroSecondaryCta}</Link></div>
          <div className="hero-proof">{c.heroProof.map((p) => <span key={p.label}><b>{p.label}</b> {p.text}</span>)}</div>
        </div>
        <div className="hero-art" aria-hidden="true"><Image className="hero-bottlebrush" src="/science/bottlebrush-macromolecule.png" width={1126} height={1324} alt="" priority unoptimized /><p><Lines text={c.heroArtCaption} /></p></div>
      </section>

      <section className="intro-grid section-pad">
        <div><p className="eyebrow">{c.introEyebrow}</p><h2>{c.introHeading}</h2></div>
        {/* The branded "Elymers" phrase keeps its styling in code; the surrounding sentence is editable. */}
        <div><p>{c.introBodyBefore} <span className="elymers-phrase">macromolecules, <strong className="elymers-emphasis">Elymers</strong>,</span> {c.introBodyAfter}</p><Link className="text-link" href="/science">{c.introLink} <ArrowIcon /></Link></div>
      </section>

      <section className="moa-home section-pad">
        <div className="section-heading"><p className="eyebrow light">{c.moaEyebrow}</p><h2>{c.moaHeading}</h2><p>{c.moaDescription}</p></div>
        <MoaExplorer compact variant="hypotheses" />
      </section>

      <section className="platform-cards section-pad">
        {c.cards.map((card) => <article key={card.number}><span>{card.number}</span><h3>{card.title}</h3><p>{card.text}</p></article>)}
      </section>

      <section className="pipeline-strip section-pad">
        <div><p className="eyebrow">{c.stripEyebrow}</p><h2>{c.stripHeading}</h2><p>{c.stripText}</p></div>
        <div className="mini-pipeline">{c.stripStages.map((s) => <span key={s.label}>{s.label} <i className={s.state || undefined}/></span>)}</div>
        <Link className="circle-link" href="/pipeline" aria-label="View pipeline"><ArrowIcon /></Link>
      </section>

      <section className="closing-cta closing-cta-left section-pad"><h2><Lines text={c.closingHeading} /></h2><Link className="button white" href="/contact">{c.closingCta} <ArrowIcon /></Link></section>
    </PageShell>
  );
}
