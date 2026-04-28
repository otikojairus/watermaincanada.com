import type { Metadata } from "next";
import Link from "next/link";
import { PhoneLink } from "@/components/phone-link";
import { WATERMAIN_PAGES, WATERMAIN_SERVICES, getPagesByService } from "@/lib/watermain-data";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sewer and Water Main Services Across Canada",
  description:
    "Explore Water Main Canada's sewer backup, sewage cleanup, drain cleaning, sewer repair, water main repair, replacement, and leak detection pages.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Sewer and Water Main Services Across Canada | ${SITE_NAME}`,
    description: "Service paths for urgent sewer, drain, water main, water line, and leak detection issues.",
    url: absoluteUrl("/services"),
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function ServicesPage() {
  return (
    <main className="wmc-shell">
      <section className="wmc-index-hero">
        <div className="wmc-container wmc-index-hero-inner">
          <div>
            <p className="wmc-kicker">Service index</p>
            <h1 className="wmc-page-title">Eight service groups. Thirty city sets. One clear route to the right page.</h1>
          </div>
          <div className="wmc-index-summary">
            <p>
              Start with the symptom that sounds closest. Each service group has city pages built from the Water Main
              Canada keyword brief, with one primary keyword target per landing page.
            </p>
            <PhoneLink className="wmc-btn wmc-btn-primary" location="services-hero" pageTier="services">
              Call {EMERGENCY_PHONE_DISPLAY}
            </PhoneLink>
          </div>
        </div>
      </section>

      <section className="wmc-index-section">
        <div className="wmc-container wmc-index-list">
          {WATERMAIN_SERVICES.map((service) => {
            const pages = getPagesByService(service.name);
            return (
              <article key={service.name} className="wmc-index-row">
                <div className="wmc-index-row-copy">
                  <p className="wmc-kicker">{pages.length} city pages</p>
                  <h2>{service.name}</h2>
                  <p>{service.intro}</p>
                </div>
                <div className="wmc-index-city-list">
                  {pages.slice(0, 10).map((page) => (
                    <Link key={page.slug} href={`/${page.slug}`}>
                      {page.city}
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="wmc-closing-section">
        <div className="wmc-container wmc-final-panel">
          <h2>Need the fastest path?</h2>
          <p>Call and describe what is happening. We will help you choose the right service path.</p>
          <PhoneLink className="wmc-btn wmc-btn-primary" location="services-closing" pageTier="services">
            Call {EMERGENCY_PHONE_DISPLAY}
          </PhoneLink>
        </div>
      </section>

      <section className="pb-14">
        <div className="wmc-container text-sm text-[var(--ink-muted)]">
          <p>{WATERMAIN_PAGES.length} generated landing pages are available from the spreadsheet.</p>
        </div>
      </section>
    </main>
  );
}
