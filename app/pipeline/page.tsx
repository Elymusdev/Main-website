import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, PageShell } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Pipeline",
  description: "Elymus is prioritizing Duchenne muscular dystrophy while building a platform for membrane-instability disorders.",
};

export default function Pipeline() {
  return <PageShell>
    <section className="page-hero pipeline-hero"><p className="eyebrow light">Pipeline</p><h1>Focused first<br/>Scalable by design</h1><p>Elymus is prioritizing Duchenne muscular dystrophy while building a platform with potential relevance across membrane-instability disorders.</p></section>
    <section className="pipeline-main section-pad"><div className="pipeline-title"><span>Lead program</span><h2>Duchenne muscular dystrophy</h2><p>Preclinical-stage membrane stabilization program</p></div><div className="pipeline-chart" aria-label="DMD program development stage"><div className="chart-labels"><span>Discovery</span><span>Lead optimization</span><span>IND-enabling</span><span>Phase 1</span></div><div className="chart-track"><i/><i/><i/><i/><b>Current focus</b></div></div><div className="pipeline-detail"><span><b>Modality</b>Bottlebrush macromolecule</span><span><b>Target</b>Sarcolemma stabilization</span><span><b>Stage</b>Preclinical</span></div></section>
    <section className="dmd-background section-pad"><div className="dmd-copy"><p className="eyebrow">DMD background</p><h2>Dystrophin is the molecular shock absorber for normal muscle cell membranes</h2><div className="dmd-narrative"><p>Duchenne muscular dystrophy is caused by mutations in a gene that result in absent or severely reduced dystrophin. Dystrophin helps connect the muscle cell cytoskeleton to the membrane associated protein complex, supporting the sarcolemma during repeated contraction. Without this support, the membrane becomes vulnerable to disruption and abnormal calcium entry. Repeated injury contributes to inflammation, loss of functional muscle tissue, progressive weakness, and loss of mobility.</p><p>Elymus is pursuing a physical membrane stabilization approach intended to address this downstream feature of DMD biology, independent of an individual mutation.</p></div></div><div className="dmd-figures"><figure><Image src="/dmd/dystrophin-activity-elymus.png" width={1672} height={941} alt="Dystrophin mechanical link between the extracellular matrix, muscle-cell membrane, and actin cytoskeleton" unoptimized/><figcaption>Dystrophin provides a mechanical link between the extracellular matrix, muscle-cell membrane, and actin cytoskeleton.</figcaption></figure><figure><Image src="/dmd/dmd-progression-elymus.png" width={1672} height={941} alt="Illustrative overview of DMD progression from early signs to assisted mobility" unoptimized/><figcaption>Illustrative overview of DMD progression; progression varies by individual.</figcaption></figure></div></section>
    <section className="horizon section-pad"><p className="eyebrow light">Platform horizon</p><h2>Membrane instability extends beyond DMD</h2><div className="horizon-grid"><span><b>Muscular dystrophies</b>Core focus</span><span><b>Ischemic reperfusion injury</b>Future research</span><span><b>Post trauma related injuries</b>Future research</span></div><p className="disclosure">Future indications are exploratory and do not represent active development programs.</p></section>
    <section className="page-cta section-pad"><h2>Interested in the Elymus platform?</h2><Link className="button primary" href="/contact">Partner with us <ArrowIcon /></Link></section>
  </PageShell>;
}
