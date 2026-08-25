import type { Metadata } from "next";
import InquiryForm from "../components/InquiryForm";
import { Lines, PageShell } from "../components/SiteChrome";
import { getContact, getSiteSettings } from "../lib/content";

// Rendered per request so CMS edits appear without a redeploy. Without this
// the page is statically prerendered and content is baked into the artifact.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Elymus about partnering, scientific collaboration, investment, or media inquiries.",
};

export default async function Contact() {
  const [c, settings] = await Promise.all([getContact(), getSiteSettings()]);
  return <PageShell>
    <section className="page-hero contact-hero"><p className="eyebrow light">{c.heroEyebrow}</p><h1><Lines text={c.heroHeading} /></h1><p>{c.heroText}</p></section>
    <section className="contact-page section-pad">
      <div className="contact-intro"><p className="eyebrow">{c.introEyebrow}</p><h2>{c.introHeading}</h2><p>{c.introText}</p><div className="contact-topics">{c.topics.map((t) => <span key={t}>{t}</span>)}</div></div>
      <InquiryForm inquiryTypes={c.inquiryTypes} contactEmail={settings.contactEmail} />
    </section>
    <section className="contact-grid contact-audiences section-pad">{c.audiences.map((a) => <div key={a.heading}><h3>{a.heading}</h3><p>{a.text}</p></div>)}</section>
    <section className="disclosure-block section-pad"><h2>{c.disclosureHeading}</h2><p>{c.disclosureText}</p></section>
  </PageShell>;
}
