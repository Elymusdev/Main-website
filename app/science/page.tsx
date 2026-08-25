import type { Metadata } from "next";
import MoaExplorer from "../components/MoaExplorer";
import { PageShell } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Science",
  description: "How Elymer bottlebrush macromolecules are engineered to engage and stabilize the muscle cell membrane.",
};

export default function Science() {
  return <PageShell>
    <section className="page-hero science-hero"><p className="eyebrow light">Science / Platform</p><h1>Engineering macromolecules<br/>for muscle protection</h1><p>Bottlebrush molecular architecture opens a differentiated physical approach to stabilizing mechanically stressed cell membranes.</p></section>
    <section className="science-primer section-pad"><div><p className="eyebrow">The biological challenge</p><h2>A fragile membrane sits at the center of muscle damage</h2></div><div><p>The sarcolemma is the membrane surrounding each muscle fiber. In Duchenne muscular dystrophy, the absence of functional dystrophin makes this membrane vulnerable to repeated contraction-induced damage.</p><p>That damage allows dysregulated movement of ions and other molecules across the membrane, contributing to progressive loss of functional muscle tissue.</p></div></section>
    <section className="science-band section-pad"><p className="eyebrow light">The Elymus platform</p><h2>Elymers are engineered bottlebrush macromolecules designed to combine nanoscale architecture with membrane engagement</h2><div className="feature-row"><article><b>Architecture</b><p>A branched macromolecule format creates a dense, tunable molecular structure.</p></article><article><b>Engagement</b><p>Amphiphilic domains are designed to interact with the lipid bilayer.</p></article><article><b>Protection</b><p>The intended result is physical membrane stabilization under mechanical stress.</p></article></div></section>
    <section className="moa-home section-pad"><div className="section-heading"><p className="eyebrow light">Mechanism overview</p><h2>Elymer proposed mechanism of action</h2><p>Three hypotheses for what the polymer may do on the lipid bilayer: patch, repair, and heal.</p></div><MoaExplorer compact variant="hypotheses" /></section>
    <section className="evidence section-pad"><div><p className="eyebrow">Evidence framework</p><h2>From molecular behavior to physiological performance</h2></div><div className="evidence-steps"><span><b>01</b>Molecular characterization</span><span><b>02</b>Membrane-binding studies</span><span><b>03</b>Cellular protection</span><span><b>04</b>Preclinical physiology</span></div></section>
  </PageShell>;
}
