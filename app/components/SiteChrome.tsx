import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "../lib/content";
import MobileNav from "./MobileNav";

const nav = [
  { label: "Science", href: "/science" },
  { label: "Pipeline", href: "/pipeline" },
  { label: "About", href: "/about" },
  { label: "Publications", href: "/publications" },
  { label: "News", href: "/news" },
];

export async function SiteHeader() {
  const s = await getSiteSettings();
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Elymus home">
        <Image className="brand-mark" src={s.logo.url} width={s.logo.width} height={s.logo.height} alt="" priority />
        <span><strong>elymus</strong></span>
      </Link>
      <nav aria-label="Primary navigation">{nav.map(({ label, href }) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <Link className="nav-cta" href="/contact">Connect</Link>
      <MobileNav items={nav} />
    </header>
  );
}

export async function SiteFooter() {
  const s = await getSiteSettings();
  return (
    <footer className="site-footer">
      <div><Link className="footer-brand" href="/">elymus</Link><p>{s.footerTagline}</p></div>
      <div className="footer-links">{nav.map(({ label, href }) => <Link key={href} href={href}>{label}</Link>)}<Link href="/contact">Contact</Link></div>
      <p className="fine-print">{s.footerFinePrint}</p>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) { return <><SiteHeader /><main>{children}</main><SiteFooter /></>; }
export function ArrowIcon() { return <span aria-hidden="true">↗</span>; }

/**
 * Renders newlines in editor-supplied copy as <br/>, so headings keep their
 * line breaks.
 *
 * A space follows each <br/> so the words stay separated if a stylesheet hides
 * the break on narrow screens (see `.closing-cta h2 br`). At a line end that
 * space collapses, so it changes nothing when the break is showing.
 */
export function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return <>{parts.map((line, i) => <span key={i}>{line}{i < parts.length - 1 ? <><br/>{" "}</> : null}</span>)}</>;
}
