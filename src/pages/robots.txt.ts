import type { APIRoute } from "astro";
import { isLive, canonicalUrl } from "../lib/business";

export const GET: APIRoute = () => {
  // preview: block indexing entirely. live: allow, plus the sitemap.
  const body = isLive
    ? `User-agent: *\nAllow: /\n\nSitemap: ${canonicalUrl}/sitemap-index.xml\n`
    : "User-agent: *\nDisallow: /\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
