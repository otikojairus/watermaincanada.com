import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PhoneLink } from "@/components/phone-link";
import {
  WATERMAIN_PAGES,
  buildCanonicalPath,
  buildFaqs,
  buildMeta,
  buildSchemas,
  getPagesByCity,
  getRelatedPages,
  getWaterMainPageBySlug,
} from "@/lib/watermain-data";
import { EMERGENCY_PHONE_DISPLAY } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return WATERMAIN_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getWaterMainPageBySlug(slug);
  return page ? buildMeta(page) : {};
}

export default async function WaterMainLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getWaterMainPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const faqs = buildFaqs(page);
  const relatedPages = getRelatedPages(page);
  const cityPages = getPagesByCity(page.city).filter((item) => item.slug !== page.slug).slice(0, 5);
  const localNote = page.localNotes.replace(/^Mention\\s+/i, "");

  return (
    <main className="wmc-shell">
      <JsonLd data={buildSchemas(page)} />

      <section className="wmc-page-hero">
        <div className="wmc-container">
          <div className="wmc-page-meta">
            <span>{page.city}, {page.province}</span>
            <span>{page.serviceCluster}</span>
          </div>
          <h1 className="wmc-page-title">{page.h1}</h1>
          <div className="wmc-page-hero-bottom">
            <p>
              You are probably here because something is backing up, leaking, smelling wrong, or putting water where it
              should not be. Water Main Canada helps {page.city} homeowners and property managers get calm, practical
              next steps.
            </p>
            <PhoneLink className="wmc-btn wmc-btn-primary" location={page.slug} pageTier="landing">
              {page.ctaText}
            </PhoneLink>
          </div>
        </div>
      </section>

      <section className="wmc-diagnostic-section">
        <div className="wmc-container wmc-diagnostic-grid">
          <aside className="wmc-diagnostic-rail">
            <p className="wmc-kicker">First read</p>
            <h2>Before anyone starts digging or cutting, understand the source.</h2>
            <ul>
              <li>Stop using fixtures if drains are backing up.</li>
              <li>Keep people away from sewage or standing water.</li>
              <li>Note whether the symptom is spreading or repeating.</li>
            </ul>
          </aside>
          <article className="wmc-prose wmc-diagnostic-copy">
            <p>{page.serviceIntro}</p>
            <p>
              In {page.city}, local conditions matter. {localNote}. That does not mean every property has the same
              problem, but it does mean the inspection should consider weather, pipe age, ground movement, municipal
              connection points, and the way water is behaving inside the building.
            </p>
            <p>
              The goal is to protect the property first, then choose the least disruptive repair path that actually
              solves the problem. Call {EMERGENCY_PHONE_DISPLAY} if the situation is active or you are unsure whether it
              can wait.
            </p>
          </article>
        </div>
      </section>

      <section className="wmc-sequence-section">
        <div className="wmc-container wmc-sequence-layout">
          <div>
            <p className="wmc-kicker">How the visit works</p>
            <h2 className="wmc-title">A direct process for a stressful problem.</h2>
          </div>
          <div className="wmc-sequence-list">
            {[
              ["Call and describe the symptom", "Tell us what is backing up, leaking, overflowing, or losing pressure."],
              ["Inspect the likely source", "A technician checks visible symptoms and decides whether the issue is drain, sewer, water line, or fixture related."],
              ["Review the repair path", "You get practical next steps, safety notes, and pricing direction before work begins."],
            ].map(([title, body], index) => (
              <div key={title} className="wmc-sequence-item">
                <span>{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wmc-cost-section">
        <div className="wmc-container wmc-cost-panel">
          <div className="wmc-cost-copy">
            <p className="wmc-kicker">Pricing clarity</p>
            <h2 className="wmc-title">The right repair depends on what the inspection finds.</h2>
            <p className="wmc-copy">
              A backup may need clearing, camera inspection, cleanup coordination, or line repair. A water main issue may
              need leak location, excavation, spot repair, or replacement. Water Main Canada keeps the conversation
              practical so you understand the options before committing.
            </p>
          </div>
          <div className="wmc-focus-ticket">
            <p className="wmc-kicker">Service focus</p>
            <strong>{page.primaryKeyword}</strong>
            <small>Local guidance for the issue you are trying to solve.</small>
          </div>
        </div>
      </section>

      <section className="wmc-faq-section">
        <div className="wmc-container">
          <div className="wmc-faq-head">
            <p className="wmc-kicker">Questions people ask</p>
            <h2 className="wmc-title">FAQs for {page.city} visitors.</h2>
          </div>
          <div className="wmc-faq-list">
            {faqs.map((faq) => (
              <article key={faq.question} className="wmc-faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wmc-related-section">
        <div className="wmc-container wmc-related-layout">
          <div>
            <p className="wmc-kicker">Nearby next steps</p>
            <h2 className="wmc-title">Related services for {page.city}.</h2>
            <p className="wmc-copy">If your issue turns out to be related but different, one of these services may fit better.</p>
          </div>
          <div className="wmc-link-list">
            {cityPages.map((item) => (
              <Link key={item.slug} href={`/${item.slug}`}>
                {item.serviceCluster}
              </Link>
            ))}
            {relatedPages.slice(cityPages.length).map((item) => (
              <Link key={item.slug} href={`/${item.slug}`}>
                {item.city}: {item.serviceCluster}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wmc-closing-section">
        <div className="wmc-container wmc-final-panel">
          <h2>{page.ctaText}</h2>
          <p>Use the call to explain what you see. We will help you decide whether it needs immediate dispatch.</p>
          <PhoneLink className="wmc-btn wmc-btn-primary" location={page.slug} pageTier="landing">
            Call {EMERGENCY_PHONE_DISPLAY}
          </PhoneLink>
        </div>
      </section>

      <section className="pb-14">
        <div className="wmc-container flex flex-wrap gap-4 text-sm text-[var(--ink-muted)]">
          <Link href="/" className="font-bold text-[var(--ink)]">
            Home
          </Link>
          <Link href="/services" className="font-bold text-[var(--ink)]">
            Services
          </Link>
          <span>{buildCanonicalPath(page.slug)}</span>
        </div>
      </section>
    </main>
  );
}
