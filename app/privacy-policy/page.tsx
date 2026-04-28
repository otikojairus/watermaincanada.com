import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Water Main Canada.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="wmc-shell">
      <section className="wmc-section">
        <div className="wmc-container max-w-4xl wmc-prose">
          <h1>Privacy Policy</h1>
          <p>Water Main Canada collects only the information needed to understand and coordinate a service request.</p>
          <p>That may include your name, phone number, service address, city, and a description of the sewer, drain, water main, water line, or leak concern.</p>
          <p>We do not sell personal information. If analytics or call tracking tools are used, they help us understand which pages are useful to visitors and improve the site experience.</p>
        </div>
      </section>
    </main>
  );
}
