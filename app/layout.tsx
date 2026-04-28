import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME, absoluteUrl, getSiteUrl } from "@/lib/seo";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} | Sewer Backup and Water Main Help Across Canada`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Water Main Canada helps homeowners and property managers respond to sewer backups, water main breaks, line repairs, replacements, and leak detection across Canada.",
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: `${SITE_NAME} | Sewer Backup and Water Main Help Across Canada`,
    description:
      "Fast, practical help for sewer backups, water main repair, water line replacement, and leak detection across Canada.",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "en_CA",
    images: [absoluteUrl("/watermaincanada-logo.svg")],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.variable} ${newsreader.variable} antialiased`}>
        <SiteNavbar />
        {children}
        <SiteFooter />
        <a className="sr-only" href="tel:18887022090">
          Call Water Main Canada at {EMERGENCY_PHONE_DISPLAY}
        </a>
      </body>
    </html>
  );
}
