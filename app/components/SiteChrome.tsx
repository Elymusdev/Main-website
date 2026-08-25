import Image from "next/image";
import Link from "next/link";

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
        <Image className="brand-mark" src="/elymus-mark.png" width={1130} height={2048} alt="" priority unoptimized />
        <span><strong>elymus</strong></span>
      </Link>
      <nav aria-label="Primary navigation">{nav.map(({ label, href }) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <Link className="nav-cta" href="/contact">Connect</Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><Link className="footer-brand" href="/">elymus</Link><p>Leveraging unique performance from bottlebrush macromolecules.</p></div>
      <div className="footer-links"><Link href="/science">Science</Link><Link href="/pipeline">Pipeline</Link><Link href="/about">Team</Link><Link href="/contact">Contact</Link></div>
      <p className="fine-print">Elymus is a preclinical-stage biotechnology company. Its investigational technologies have not been approved by any regulatory authority, and safety and efficacy have not been established.</p>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) { return <><SiteHeader /><main>{children}</main><SiteFooter /></>; }
export function ArrowIcon() { return <span aria-hidden="true">↗</span>; }
