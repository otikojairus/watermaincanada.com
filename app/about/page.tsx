import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PhoneLink } from "@/components/phone-link";
import { EMERGENCY_PHONE_DISPLAY, EMERGENCY_PHONE_E164, SITE_NAME, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Water Main Canada",
  description:
    "Water Main Canada helps homeowners and property managers understand urgent sewer, drain, water main, and leak detection problems across Canada.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/watermaincanada-logo.svg"),
    telephone: EMERGENCY_PHONE_E164,
    areaServed: "CA",
  };

  return (
    <main className="wmc-shell">
      <JsonLd data={organizationSchema} />
      <section className="wmc-page-hero">
        <div className="wmc-container max-w-4xl">
          <div className="wmc-page-meta">
            <span>About Water Main Canada</span>
            <span>Canada-wide</span>
          </div>
          <h1 className="wmc-page-title">Built for sewer, drain, and water line decisions that cannot wait.</h1>
          <div className="wmc-page-hero-bottom">
            <p>
              Our job is to help people move from uncertain symptoms to a clear next step, especially when the problem is
              underground, messy, or hard to diagnose from the surface.
            </p>
          </div>
        </div>
      </section>

      <section className="wmc-section">
        <div className="wmc-container max-w-4xl wmc-prose">
          <p>
            Water Main Canada focuses on the problems that sit between plumbing, drainage, excavation, cleanup, and
            municipal connection points. A sewer backup, water main leak, collapsed line, or hidden leak can feel
            confusing because the most important issue is often out of sight.
          </p>
          <p>
            Water Main Canada is organized around the way people search during a stressful property problem: by the
            service they need and the city they are in. The guidance is written for the person trying to protect a
            property, with practical context for local sewer, drain, water line, and leak detection concerns.
          </p>
          <p>
            If you are unsure what category your problem falls into, call and describe the symptoms. We will help you
            decide whether the next step is drain clearing, sewer inspection, water line repair, replacement planning,
            leak detection, or cleanup coordination.
          </p>
        </div>
      </section>

      <section className="wmc-closing-section">
        <div className="wmc-container wmc-final-panel">
          <h2>Need help choosing the right path?</h2>
          <p>Call Water Main Canada and start with what you can see, smell, or hear.</p>
          <PhoneLink className="wmc-btn wmc-btn-primary" location="about-closing" pageTier="about">
            Call {EMERGENCY_PHONE_DISPLAY}
          </PhoneLink>
        </div>
      </section>
    </main>
  );
}
