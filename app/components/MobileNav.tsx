"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Header navigation for narrow screens.
 *
 * Below 900px the desktop nav is hidden by CSS, so without this the only link
 * in the header is the logo — leaving several pages reachable only from the footer.
 *
 * The panel is portalled to <body> rather than rendered in place: the header
 * sets `backdrop-filter`, which makes it the containing block for any
 * `position: fixed` descendant. Left inside, the panel sizes itself against the
 * 76px header instead of the viewport and collapses to a thin strip.
 */
export default function MobileNav({ items }: { items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    // Stop the page scrolling behind the open panel.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const panel = (
    <div id="mobile-nav" className="mobile-nav" hidden={!open}>
      <nav aria-label="Site navigation">
        {items.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
        ))}
        <Link className="mobile-nav-cta" href="/contact" onClick={() => setOpen(false)}>Connect</Link>
      </nav>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
      {mounted ? createPortal(panel, document.body) : null}
    </>
  );
}
