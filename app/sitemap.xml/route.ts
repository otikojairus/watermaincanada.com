import { WATERMAIN_PAGES } from "@/lib/watermain-data";
import { getSiteUrl } from "@/lib/seo";

const STATIC_PATHS = ["/", "/services", "/about", "/contact", "/privacy-policy", "/terms-of-service"] as const;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const lastModified = new Date().toISOString();
  const urls = [
    ...STATIC_PATHS.map((path) => ({
      loc: `${siteUrl}${path}`,
      priority: path === "/" ? "1.0" : "0.7",
    })),
    ...WATERMAIN_PAGES.map((page) => ({
      loc: `${siteUrl}/${page.slug}`,
      priority: page.priority.includes("P1") ? "0.9" : "0.75",
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
