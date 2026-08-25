import type { Metadata } from "next";
import Image from "next/image";
import { ArrowIcon, Lines, PageShell } from "../components/SiteChrome";
import { getAbout, getTeam, type TeamMember } from "../lib/content";

// Rendered per request so CMS edits appear without a redeploy. Without this
// the page is statically prerendered and content is baked into the artifact.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "The Elymus team: founders, executive leadership, and scientific, medical, and business advisors.",
};

function Person({ p }: { p: TeamMember }) {
  return <article className="person"><Image src={p.image} width={520} height={520} alt={p.name}/><div><p>{p.role}</p><h3>{p.name}</h3><small>{p.note}</small><a href={p.linkedin} target="_blank" rel="noreferrer" aria-label={`${p.name} on LinkedIn`}>LinkedIn <ArrowIcon /></a></div></article>;
}

export default async function About() {
  const [c, { leaders, advisors }] = await Promise.all([getAbout(), getTeam()]);
  return <PageShell>
    <section className="page-hero about-hero"><p className="eyebrow light">{c.heroEyebrow}</p><h1><Lines text={c.heroHeading} /></h1><p>{c.heroText}</p></section>
    <section className="team-section section-pad"><div className="section-heading"><p className="eyebrow">{c.leadershipEyebrow}</p><h2>{c.leadershipHeading}</h2></div><div className="team-grid">{leaders.map(p=><Person p={p} key={p._id ?? p.name}/>)}</div></section>
    <section className="team-section advisors section-pad"><div className="section-heading"><p className="eyebrow">{c.advisorsEyebrow}</p><h2>{c.advisorsHeading}</h2></div><div className="team-grid advisor-grid">{advisors.map(p=><Person p={p} key={p._id ?? p.name}/>)}</div></section>
    <section className="values section-pad"><p className="eyebrow light">{c.valuesEyebrow}</p><div><h2>{c.valuesHeading}</h2><p>{c.valuesText}</p></div></section>
  </PageShell>;
}
