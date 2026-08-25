import type { Metadata } from "next";
import InquiryForm from "../components/InquiryForm";
import { PageShell } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Elymus about partnering, scientific collaboration, investment, or media inquiries.",
};

export default function Contact(){return <PageShell>
  <section className="page-hero contact-hero"><p className="eyebrow light">Contact</p><h1>Let’s explore what<br/>macromolecular science can do</h1><p>We welcome conversations with pharmaceutical partners, investors, scientific collaborators, and the DMD community.</p></section>
  <section className="contact-page section-pad">
    <div className="contact-intro"><p className="eyebrow">Start a conversation</p><h2>Contact Elymus</h2><p>Tell us a little about your inquiry and the Elymus team can direct it to the appropriate scientific or business contact.</p><div className="contact-topics"><span>Partnering</span><span>Scientific collaboration</span><span>Investment</span><span>Media</span></div></div>
    <InquiryForm />
  </section>
  <section className="contact-grid contact-audiences section-pad"><div><h3>For the DMD community</h3><p>Elymus is currently in preclinical development and cannot provide medical advice, enrollment information, or access to an investigational therapy. We are committed to communicating progress clearly as the program develops.</p></div><div><h3>Media and research</h3><p>Visit our News and Publications pages for source materials and peer reviewed research.</p></div></section>
  <section className="disclosure-block section-pad"><h2>Important disclosure</h2><p>All Elymus programs are preclinical. No Elymus product candidate has been approved for commercial use. Statements about mechanism, performance, or potential applications are based on laboratory and preclinical research and should not be interpreted as evidence of safety or efficacy in people.</p></section>
  </PageShell>}
