import type { Metadata } from "next";
import Image from "next/image";
import { ArrowIcon, PageShell } from "../components/SiteChrome";
import { getTeam, type TeamMember } from "../lib/content";

// Rendered per request so CMS edits appear without a redeploy. Without this
// the page is statically prerendered and content is baked into the artifact.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "The Elymus team: founders, executive leadership, and scientific, medical, and business advisors.",
};

function Person({ p }: { p: TeamMember }) {
  return <article className="person"><Image src={p.image} width={520} height={520} alt={p.name} unoptimized/><div><p>{p.role}</p><h3>{p.name}</h3><small>{p.note}</small><a href={p.linkedin} target="_blank" rel="noreferrer" aria-label={`${p.name} on LinkedIn`}>LinkedIn <ArrowIcon /></a></div></article>;
}

export default async function About() {
  const { leaders, advisors } = await getTeam();
  return <PageShell>
    <section className="page-hero about-hero"><p className="eyebrow light">About Elymus</p><h1>Built across scientific<br/>disciplines</h1><p>Our team brings together expertise in marcomolecular science, biomolecular engineering, deep knowledge of muscular dystrophy, cardiovascular disease, and drug development.</p></section>
    <section className="team-section section-pad"><div className="section-heading"><p className="eyebrow">Leadership</p><h2>Founders and executive leadership</h2></div><div className="team-grid">{leaders.map(p=><Person p={p} key={p._id ?? p.name}/>)}</div></section>
    <section className="team-section advisors section-pad"><div className="section-heading"><p className="eyebrow">Advisors</p><h2>Scientific, medical and business guidance</h2></div><div className="team-grid advisor-grid">{advisors.map(p=><Person p={p} key={p._id ?? p.name}/>)}</div></section>
    <section className="values section-pad"><p className="eyebrow light">How we work</p><div><h2>Rigorous by design</h2><p>We connect fundamental molecular insight to biological performance through careful characterization, translational focus, and multidisciplinary collaboration.</p></div></section>
  </PageShell>;
}
