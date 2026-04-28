import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms Of Service",
  description: "Terms of service for Water Main Canada.",
};

export default function TermsPage() {
  return (
    <main className="wmc-shell">
      <section className="wmc-section">
        <div className="wmc-container max-w-4xl wmc-prose">
          <h1>Terms Of Service</h1>
          <p>Water Main Canada provides information and service coordination for sewer, drain, water main, water line, replacement, and leak detection requests.</p>
          <p>Service availability, pricing, and response time depend on location, access, severity, technician availability, and site conditions.</p>
          <p>Callers are responsible for providing accurate location details and safe access. If there is an immediate threat to life or safety, contact emergency services first.</p>
        </div>
      </section>
    </main>
  );
}
