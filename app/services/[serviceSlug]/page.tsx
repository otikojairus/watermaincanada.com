import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PhoneLink } from "@/components/phone-link";
import { getPagesByService, getServiceBySlug } from "@/lib/watermain-data";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME, absoluteUrl, trimMetaDescription } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{ serviceSlug: string }>;
};

export async function generateStaticParams() {
  return [
    "emergency-sewer-backup-response",
    "sewage-cleanup-and-basement-backup-solutions",
    "main-drain-backup-and-clogged-drain-services",
    "sewer-line-repair-and-pipe-collapse-repair",
    "emergency-water-main-repair",
    "water-line-repair-and-water-pipe-repair",
    "water-main-replacement-and-line-replacement",
    "leak-detection-and-preventive-maintenance",
  ].map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return {};

  const firstCityPage = getPagesByService(service.name)[0];
  const cityName = firstCityPage?.city ?? "Canada";
  const title = `${service.name} ${cityName} | ${SITE_NAME}`;
  const description = trimMetaDescription(
    `${service.name} ${cityName} and across Canada. Review symptoms, safety steps, inspection process, repair options, and call now for fast dispatch.`,
    160,
  );

  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/services/${service.slug}`),
      type: "website",
      siteName: SITE_NAME,
    },
  };
}

export default async function ServicePillarPage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const cityPages = getPagesByService(service.name);
  const primaryPage = cityPages[0];
  const keyword = primaryPage?.primaryKeyword ?? service.name;

  const faqs = [
    {
      question: `How do I know if I need ${service.name.toLowerCase()}?`,
      answer:
        "Start with the symptom pattern instead of jumping to a repair method. Repeating backups, unexplained water, pressure changes, odours, or wet soil usually means a deeper line-level issue that should be inspected before more disruption or cost.",
    },
    {
      question: "What happens during the first inspection visit?",
      answer:
        "The first visit is diagnostic. The technician checks where symptoms appear, whether the issue is isolated or property-wide, and whether the concern points to sewer, drain, water line, or water main conditions. You should get practical next steps before work starts.",
    },
    {
      question: "Can I get help urgently if the issue is active now?",
      answer:
        "Yes. If water or sewage is actively spreading, pressure is dropping quickly, or conditions feel unsafe, call immediately. Fast containment and triage are usually the best way to reduce damage and avoid choosing the wrong repair path.",
    },
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      description: service.summary,
      provider: { "@type": "Organization", name: SITE_NAME },
      areaServed: "CA",
      url: absoluteUrl(`/services/${service.slug}`),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
        { "@type": "ListItem", position: 3, name: service.name, item: absoluteUrl(`/services/${service.slug}`) },
      ],
    },
  ];

  return (
    <main className="wmc-shell">
      <JsonLd data={schema} />

      <section className="wmc-page-hero">
        <div className="wmc-container">
          <div className="wmc-page-meta">
            <span>Service Pillar</span>
            <span>Canada-wide</span>
          </div>
          <h1 className="wmc-page-title">{service.name} Across Canadian Cities</h1>
          <div className="wmc-page-hero-bottom">
            <p>
              {keyword} situations can escalate quickly when symptoms are ignored or treated as a one-off issue.
              This guide is built to help you move from uncertainty to action with a clear sequence: identify the
              likely source, protect people and property, confirm whether the issue is urgent, and choose an inspection
              path that matches what is happening at your address. Conditions vary city to city, so use the local pages
              below for location-specific next steps.
            </p>
            <PhoneLink className="wmc-btn wmc-btn-primary" location={`pillar-${service.slug}`} pageTier="services">
              Call {EMERGENCY_PHONE_DISPLAY}
            </PhoneLink>
          </div>
        </div>
      </section>

      <section className="wmc-diagnostic-section">
        <div className="wmc-container wmc-diagnostic-grid">
          <aside className="wmc-diagnostic-rail">
            <p className="wmc-kicker">Service overview</p>
            <h2>What this service path solves.</h2>
            <ul>
              <li>Separates urgent vs non-urgent symptoms based on what you can observe.</li>
              <li>Helps avoid repeated short-term fixes that miss the root cause.</li>
              <li>Connects inspection findings to realistic repair options and sequencing.</li>
            </ul>
          </aside>
          <article className="wmc-prose wmc-diagnostic-copy">
            <p>{service.intro}</p>
            <p>
              The right outcome starts with scope clarity. Many properties show overlapping symptoms, and a drain issue
              can appear like a water-line issue, while a supply-side leak can look like groundwater or foundation
              seepage. A disciplined inspection sequence prevents unnecessary excavation, avoids premature replacement,
              and supports better cost planning. This is especially important for older neighbourhoods where legacy pipe
              materials, prior repairs, and shifting soils can all influence diagnosis.
            </p>
            <p>
              During triage, capture when the issue starts, what triggers it, and whether it is localized or building
              wide. Those details directly influence the inspection method and can reduce time to resolution. If there is
              active water spread, sewage exposure, or sudden pressure loss, treat it as a priority call and limit use
              until the source is identified. Early containment often lowers repair scope and shortens restoration time.
            </p>
            <p>
              Once the likely source is confirmed, repairs should be discussed in plain terms: what must happen now, what
              can be scheduled, what risks increase if delayed, and how the property will be restored after access work.
              Homeowners and property managers should expect clear options instead of one-size-fits-all recommendations.
              The city pages linked below add location context so you can review the same service through your local
              climate, infrastructure patterns, and neighbourhood constraints.
            </p>
          </article>
        </div>
      </section>

      <section className="wmc-related-section">
        <div className="wmc-container wmc-related-layout">
          <div>
            <p className="wmc-kicker">City pages</p>
            <h2 className="wmc-title">{service.name} by city.</h2>
            <p className="wmc-copy">
              Choose your city for local service context, symptom guidance, and keyword-specific pages aligned to this
              service path.
            </p>
          </div>
          <div className="wmc-link-list">
            {cityPages.map((page) => (
              <Link key={page.slug} href={`/${page.slug}`}>
                {page.primaryKeyword}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wmc-faq-section">
        <div className="wmc-container">
          <div className="wmc-faq-head">
            <p className="wmc-kicker">Frequently asked questions</p>
            <h2 className="wmc-title">FAQs about {service.name.toLowerCase()}.</h2>
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
    </main>
  );
}
