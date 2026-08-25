import Image from "next/image";
import Link from "next/link";
import MoaExplorer from "./components/MoaExplorer";
import { ArrowIcon, PageShell } from "./components/SiteChrome";

export default function Home() {
  return (
    <PageShell>
      <section className="hero">
        <div className="hero-copy">
          <h1>Building a new layer of <span className="hero-accent">muscle protection</span></h1>
          <p className="lede">Elymus is engineering bottlebrush macromolecules designed to stabilize damaged muscle cell membranes, starting with Duchenne muscular dystrophy.</p>
          <div className="button-row"><Link className="button primary" href="/science">Explore the science <ArrowIcon /></Link><Link className="button ghost" href="/pipeline">View our pipeline</Link></div>
          <div className="hero-proof"><span><b>Preclinical</b> development stage</span><span><b>DMD</b> lead indication</span><span><b>Peer-reviewed</b> foundation</span></div>
        </div>
        <div className="hero-art" aria-hidden="true"><Image className="hero-bottlebrush" src="/science/bottlebrush-macromolecule.png" width={1126} height={1324} alt="" priority unoptimized /><p>Engineered architecture.<br/>Purposeful membrane engagement.</p></div>
      </section>

      <section className="intro-grid section-pad">
        <div><p className="eyebrow">Engineering Biology Approach</p><h2>Protecting the membrane that protects the muscle</h2></div>
        <div><p>In Duchenne muscular dystrophy, loss of dystrophin leaves the sarcolemma vulnerable to mechanical stress and disruption. Elymus is developing a powerful new class of <span className="elymers-phrase">macromolecules, <strong className="elymers-emphasis">Elymers</strong>,</span> designed to engage and stabilize the muscle membrane.</p><Link className="text-link" href="/science">How the platform works <ArrowIcon /></Link></div>
      </section>

      <section className="moa-home section-pad">
        <div className="section-heading"><p className="eyebrow light">Mechanism overview</p><h2>Elymer proposed mechanism of action</h2><p>Three hypotheses for what the polymer may do on the lipid bilayer: patch, repair, and heal.</p></div>
        <MoaExplorer compact variant="hypotheses" />
      </section>

      <section className="platform-cards section-pad">
        <article><span>01</span><h3>Broad reach</h3><p>Membrane instability is a critical feature across multiple pathologies, including muscular dystrophy, myocardial infarction, and trauma related injuries.</p></article>
        <article><span>02</span><h3>Unique performance</h3><p>Bottlebrush designs have demonstrated differentiated membrane engagement, cellular protection, and physiological outcomes in preclinical studies.</p></article>
        <article><span>03</span><h3>Rigorous science</h3><p>Discovery and engineering are grounded in molecular characterization and peer-reviewed work from leaders in marcomolecular science and muscle biology.</p></article>
      </section>

      <section className="pipeline-strip section-pad">
        <div><p className="eyebrow">Lead program</p><h2>Duchenne muscular dystrophy</h2><p>A devastating genetic disease defined by progressive muscle degeneration and membrane fragility.</p></div>
        <div className="mini-pipeline"><span>Discovery <i className="done"/></span><span>Lead optimization <i className="current"/></span><span>IND-enabling <i/></span><span>Clinical <i/></span></div>
        <Link className="circle-link" href="/pipeline" aria-label="View pipeline"><ArrowIcon /></Link>
      </section>

      <section className="closing-cta closing-cta-left section-pad"><h2>Science at the interface<br/>of macromolecules and biology</h2><Link className="button white" href="/contact">Connect with Elymus <ArrowIcon /></Link></section>
    </PageShell>
  );
}
