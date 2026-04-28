import type { Metadata } from "next";
import { PhoneLink } from "@/components/phone-link";
import { EMERGENCY_PHONE_DISPLAY } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Water Main Canada",
  description: "Call Water Main Canada for sewer backup, water main, water line, drain, and leak detection help.",
};

export default function ContactPage() {
  return (
    <main className="wmc-shell">
      <section className="wmc-section">
        <div className="wmc-container max-w-3xl">
          <div className="wmc-contact-panel">
            <p className="wmc-kicker">Contact</p>
            <h1>Call Water Main Canada</h1>
            <p>
              Phone is the fastest path when water, sewage, pressure loss, or a buried line issue may be active. Tell us
              what changed and where you are located.
            </p>
            <PhoneLink className="wmc-contact-phone" location="contact-page" pageTier="contact">
              {EMERGENCY_PHONE_DISPLAY}
            </PhoneLink>
          </div>
        </div>
      </section>
    </main>
  );
}
