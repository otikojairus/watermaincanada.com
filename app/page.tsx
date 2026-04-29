import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PhoneLink } from "@/components/phone-link";
import { WATERMAIN_CITIES, WATERMAIN_PAGES, WATERMAIN_SERVICES } from "@/lib/watermain-data";
import { EMERGENCY_PHONE_DISPLAY, EMERGENCY_PHONE_E164, SITE_NAME, absoluteUrl } from "@/lib/seo";

const HOME_STEPS = [
  "Tell us what you are seeing: backup, odour, wet ground, pressure loss, or active water.",
  "We help you protect the property and route the right sewer or water line technician.",
  "You get a clear inspection path, practical repair options, and next steps before work begins.",
] as const;

export const metadata: Metadata = {
  title: "Water Main Canada | Sewer Backup and Water Main Response",
  description:
    "Water Main Canada helps with sewer backups, sewage cleanup, drain cleaning, water main repair, water line replacement, and leak detection across Canada.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Water Main Canada | Sewer Backup and Water Main Response",
    description:
      "Canada-wide support for urgent sewer backups, water main repair, line replacement, and leak detection.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: SITE_NAME,
    images: [absoluteUrl("/watermaincanada-logo.svg")],
  },
};

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/watermaincanada-logo.svg"),
    telephone: EMERGENCY_PHONE_E164,
    areaServed: "CA",
  };

  const priorityPages = WATERMAIN_PAGES.filter((page) => page.priority.includes("P1")).slice(0, 6);

  return (
    <main className="wmc-shell">
      <JsonLd data={organizationSchema} />

      <section className="wmc-home-hero">
        <div className="wmc-container">
          <div className="wmc-hero-label-row">
            <p>Canada-wide sewer and water line response</p>
            <span>24/7 intake</span>
          </div>
          <h1 className="wmc-home-title">When the problem is underground, start with what you can see.</h1>
          <div className="wmc-home-intro">
            <p>
              Sewer backups, water main leaks, line failures, and hidden water loss can change a normal day quickly.
              Water Main Canada helps you understand what is urgent, what to avoid, and who needs to be dispatched.
            </p>
            <div className="wmc-actions">
              <PhoneLink className="wmc-btn wmc-btn-primary" location="homepage-hero" pageTier="home">
                Call {EMERGENCY_PHONE_DISPLAY}
              </PhoneLink>
              <Link href="/services" className="wmc-btn wmc-btn-ghost">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wmc-triage-band">
        <div className="wmc-container wmc-triage-grid">
          {HOME_STEPS.map((step, index) => (
            <div key={step} className="wmc-triage-item">
              <span>0{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wmc-ledger-section">
        <div className="wmc-container wmc-ledger-layout">
          <div className="wmc-ledger-sticky">
            <p className="wmc-kicker">Service paths</p>
            <h2 className="wmc-title">Choose the issue that matches what you are seeing.</h2>
            <p className="wmc-copy">
              Each path starts with symptoms, then moves toward inspection and repair so you can understand what may
              need attention next.
            </p>
          </div>
          <div className="wmc-service-ledger">
            {WATERMAIN_SERVICES.map((service) => (
              <article key={service.name} className="wmc-ledger-row">
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
                <Link href="/services">Learn More</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cities" className="wmc-map-section">
        <div className="wmc-container">
          <div className="wmc-map-head">
            <div>
              <p className="wmc-kicker">Local help</p>
              <h2 className="wmc-title">Choose your city for sewer, drain, and water line support.</h2>
            </div>
            <p>
              Pick a city to start with the issue closest to what you are seeing, then review related water main, water
              line, drain, and leak detection services from there.
            </p>
          </div>
          <div className="wmc-city-ribbon">
            {WATERMAIN_CITIES.map((city) => {
              const firstPage = WATERMAIN_PAGES.find((page) => page.city === city.name);
              return (
                <Link key={`${city.name}-${city.province}`} id={city.slug} href={`/${firstPage?.slug ?? ""}`} className="wmc-city-chip">
                  <span>{city.name}</span>
                  <small>{city.province}</small>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="wmc-priority-section">
        <div className="wmc-container wmc-priority-layout">
          <div className="wmc-priority-copy">
            <p className="wmc-kicker">Priority response</p>
            <h2 className="wmc-title">Find urgent sewer and water line help by city.</h2>
            <p className="wmc-copy">
              Start with your city and the problem you are facing, then review the symptoms, inspection steps, and
              repair options that may apply.
            </p>
          </div>
          <div className="wmc-priority-stack">
            {priorityPages.map((page) => (
              <Link key={page.slug} href={`/${page.slug}`}>
                <span>{page.city}</span>
                {page.h1}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wmc-closing-section">
        <div className="wmc-container wmc-final-panel">
          <h2>Not sure whether it is a sewer line, water main, or hidden leak?</h2>
          <p>Call Water Main Canada and describe the symptoms. We will help you decide the safest next step.</p>
          <PhoneLink className="wmc-btn wmc-btn-primary" location="homepage-closing" pageTier="home">
            Call {EMERGENCY_PHONE_DISPLAY}
          </PhoneLink>
        </div>
      </section>
    </main>
  );
}
