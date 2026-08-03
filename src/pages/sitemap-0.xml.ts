import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { serviceSlug } from "../lib/slug";
import { isLive, canonicalUrl } from "../lib/business";

const STATIC_PATHS = ["/", "/about", "/contact", "/services"];

/** Build the list of public paths (respecting provisional gating). */
export async function publicPaths(): Promise<string[]> {
  const services = await getCollection("services", ({ data }) => !data.provisional);
  const detailPaths = services.map(
    (entry) => `/services/${serviceSlug(entry)}`,
  );
  return [...STATIC_PATHS, ...detailPaths];
}

/** Render the sitemap only when live; empty otherwise (robots excludes it). */
export const GET: APIRoute = async () => {
  if (!isLive || !canonicalUrl) {
    return new Response("", { headers: { "Content-Type": "application/xml" } });
  }
  const paths = await publicPaths();
  const urls = paths
    .map(
      (p) =>
        `  <url><loc>${canonicalUrl}${p === "/" ? "" : p}</loc></url>`,
    )
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
