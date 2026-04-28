import Link from "next/link";
import { PhoneLink } from "@/components/phone-link";
import { WATERMAIN_CITIES, WATERMAIN_SERVICES } from "@/lib/watermain-data";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="wmc-footer">
      <div className="wmc-container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div>
            <p className="wmc-footer-title">{SITE_NAME}</p>
            <p className="mt-3 max-w-md text-white/72">
              Canada-wide help for sewer backups, water main repair, water line replacement, leak detection, and urgent
              underground plumbing problems.
            </p>
            <PhoneLink className="wmc-footer-phone" location="footer" pageTier="global">
              {EMERGENCY_PHONE_DISPLAY}
            </PhoneLink>
          </div>
          <div>
            <h3 className="wmc-footer-title">Services</h3>
            <div className="mt-4 grid gap-2">
              {WATERMAIN_SERVICES.slice(0, 6).map((service) => (
                <Link key={service.name} href="/services" className="wmc-footer-link">
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="wmc-footer-title">Cities</h3>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {WATERMAIN_CITIES.slice(0, 10).map((city) => (
                <Link key={`${city.name}-${city.province}`} href={`/#${city.slug}`} className="wmc-footer-link">
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-4 border-t border-white/12 pt-6 text-sm text-white/60">
          <span>© {new Date().getFullYear()} {SITE_NAME}</span>
          <Link href="/privacy-policy" className="wmc-footer-link">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="wmc-footer-link">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
