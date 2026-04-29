"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteLogo } from "@/components/site-logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/#cities", label: "Cities" },
  { href: "/about", label: "About" },
] as const;

export function SiteNavbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const className = "wmc-scroll-lock";
    document.documentElement.classList.toggle(className, isDrawerOpen);
    document.body.classList.toggle(className, isDrawerOpen);

    return () => {
      document.documentElement.classList.remove(className);
      document.body.classList.remove(className);
    };
  }, [isDrawerOpen]);

  return (
    <>
      <header className="wmc-navbar">
        <div className="wmc-container wmc-navbar-row">
          <SiteLogo />
          <nav className="wmc-nav-links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="wmc-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="wmc-menu-btn lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={isDrawerOpen}
            onClick={() => setIsDrawerOpen((open) => !open)}
          >
            <i className="fa-solid fa-bars" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className={`wmc-drawer lg:hidden ${isDrawerOpen ? "is-open" : ""}`} aria-hidden={!isDrawerOpen}>
        <button type="button" className="wmc-drawer-scrim" aria-label="Close menu" onClick={() => setIsDrawerOpen(false)} />
        <div className="wmc-drawer-panel">
          <div className="flex items-center justify-between">
            <SiteLogo />
            <button type="button" className="text-xl text-[var(--ink)]" aria-label="Close menu" onClick={() => setIsDrawerOpen(false)}>
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          </div>
          <nav className="mt-8 grid gap-3" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="wmc-mobile-link" onClick={() => setIsDrawerOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
