import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "../lib/content";

const nav = [
  { label: "Science", href: "/science" },
  { label: "Pipeline", href: "/pipeline" },
  { label: "About", href: "/about" },
  { label: "Publications", href: "/publications" },
  { label: "News", href: "/news" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Elymus home">
        <Image className="brand-mark" src="/elymus-mark.png" width={1130} height={2048} alt="" priority />
        <span><strong>elymus</strong></span>
      </Link>
      <nav aria-label="Primary navigation">{nav.map(({ label, href }) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <Link className="nav-cta" href="/contact">Connect</Link>
    </header>
  );
}

export async function SiteFooter() {
  const s = await getSiteSettings();
  return (
    <footer className="site-footer">
      <div><Link className="footer-brand" href="/">elymus</Link><p>{s.footerTagline}</p></div>
      <div className="footer-links"><Link href="/science">Science</Link><Link href="/pipeline">Pipeline</Link><Link href="/about">Team</Link><Link href="/contact">Contact</Link></div>
      <p className="fine-print">{s.footerFinePrint}</p>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) { return <><SiteHeader /><main>{children}</main><SiteFooter /></>; }
export function ArrowIcon() { return <span aria-hidden="true">↗</span>; }

/** Renders newlines in editor-supplied copy as <br/>, so headings keep their line breaks. */
export function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return <>{parts.map((line, i) => <span key={i}>{line}{i < parts.length - 1 ? <br/> : null}</span>)}</>;
}
