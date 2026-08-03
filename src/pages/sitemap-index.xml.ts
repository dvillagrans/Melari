import type { APIRoute } from "astro";
import { isLive, canonicalUrl } from "../lib/business";

export const GET: APIRoute = () => {
  if (!isLive || !canonicalUrl) {
    return new Response("", { headers: { "Content-Type": "application/xml" } });
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${canonicalUrl}/sitemap-0.xml</loc></sitemap>\n</sitemapindex>`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
