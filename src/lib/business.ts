// Centralized business configuration for Melari Spa.
//
// Single source of truth for everything business-related: identity, contact
// channels, location, map, socials, booking, hours, SEO metadata, and the
// site mode (preview | live).
//
// Modes
// -----
// - preview (default): safe to show to the client. No editable dead forms,
//   no fake social links, robots noindex,nofollow, CTAs point to /services.
// - live: production-ready. Requires a working conversion channel and
//   verified business data; the build FAILS otherwise (see validateLive()).
//
// Switching to live is a one-line change: SITE_MODE=live plus the confirmed
// client data in this file. See docs/go-live-checklist.md.

export type SiteMode = "preview" | "live";

const mode: SiteMode =
  (import.meta.env.SITE_MODE as SiteMode | undefined) ?? "preview";

// ---------------------------------------------------------------------------
// Business data — edit here when the client confirms each field.
// ---------------------------------------------------------------------------

export const business = {
  name: "Melari Spa",
  legalName: "Melari Spa",
  description:
    "Melari Spa y Terapia Alternativa — masajes, tratamientos faciales y terapias de bienestar para cuerpo y mente.",

  // Contact channels (leave empty string "" while unverified in preview;
  // the build REQUIRES at least one of bookingUrl / whatsapp / phone in live).
  phone: "", // e.g. "+52 55 1234 5678" — used for tel: links and JSON-LD
  whatsapp: "", // e.g. "+52 55 1234 5678" — used for wa.me links
  email: "", // e.g. "hola@melarispa.com"
  web: "", // e.g. "https://melarispa.com"

  // Physical location
  address: "", // street address
  city: "", // city
  region: "", // state / region (optional)
  country: "", // ISO 3166-1 alpha-2, e.g. "MX"
  postalCode: "", // optional
  mapUrl: "", // full link (Google Maps "share" URL or directions link)

  // Geo coordinates (optional but recommended for JSON-LD)
  latitude: undefined as number | undefined,
  longitude: undefined as number | undefined,

  // Social networks ("" = not published; preview hides them entirely)
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },

  // Booking: TimeUp online booking URL, or "" to fall back to WhatsApp/phone
  bookingUrl: "", // e.g. "https://melari.timeup.mx/" — used for the booking CTA

  // Opening hours ("" = not published; JSON-LD openingHours is omitted)
  hours: {
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  },

  // SEO / metadata
  domain: "", // e.g. "melarispa.com" (no protocol) — used for canonical/OG/JSON-LD
  ogImage: "/banner.webp",
  locale: "es_MX",
};

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------

export const SITE_MODE: SiteMode = mode;
export const isLive = mode === "live";

/** E.164 phone for tel:/wa.me links (digits only, leading +). */
const e164 = (value: string) => value.replace(/[^\d+]/g, "");

export const phoneHref = business.phone ? `tel:${e164(business.phone)}` : "";
export const whatsappHref = business.whatsapp
  ? `https://wa.me/${e164(business.whatsapp).replace(/^\+/, "")}`
  : "";
export const emailHref = business.email ? `mailto:${business.email}` : "";

/** Canonical URL (full absolute) or "" when no domain is configured. */
export const canonicalUrl = business.domain
  ? `https://${business.domain}`
  : "";

export const socialLinks = Object.entries(business.social)
  .filter(([, url]) => url)
  .map(([network, url]) => ({ network, url }));

/**
 * The single conversion channel used for the primary booking CTAs.
 * Priority: bookingUrl → whatsapp → phone → "" (none).
 */
export const conversionChannel = (() => {
  if (business.bookingUrl) return { kind: "booking", href: business.bookingUrl } as const;
  if (business.whatsapp) return { kind: "whatsapp", href: whatsappHref } as const;
  if (business.phone) return { kind: "phone", href: phoneHref } as const;
  return null;
})();

export const ctaLabel = (() => {
  switch (conversionChannel?.kind) {
    case "booking":
      return "Agendar una cita";
    case "whatsapp":
      return "Escríbenos por WhatsApp";
    case "phone":
      return "Llámanos";
    default:
      return "Agendar una cita";
  }
})();

/** Hours as a human list, only for non-empty entries. */
export const hoursList = Object.entries(business.hours).filter(([, v]) => v);

export const jsonLdOpeningHours = (() => {
  if (hoursList.length === 0) return undefined;
  return hoursList.map(([day, hours]) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: day[0].toUpperCase() + day.slice(1),
    opens: hours.split("–")[0]?.trim() || hours,
    closes: hours.split("–")[1]?.trim() || hours,
  }));
})();

// ---------------------------------------------------------------------------
// Live-mode validation — the build fails if essential data is missing.
// ---------------------------------------------------------------------------

const requiredLiveFields: Array<[keyof typeof business, string]> = [
  ["phone", "business.phone"],
  ["whatsapp", "business.whatsapp"],
  ["address", "business.address"],
  ["city", "business.city"],
  ["domain", "business.domain"],
];

function validateLive(): void {
  const missing = requiredLiveFields.filter(([key]) => !business[key]);
  if (missing.length > 0) {
    throw new Error(
      `[site mode=live] Missing essential business fields: ${missing
        .map(([, label]) => label)
        .join(", ")}. ` +
        "Add the confirmed client data to src/lib/business.ts before going live.",
    );
  }
  if (!conversionChannel) {
    throw new Error(
      "[site mode=live] No conversion channel configured. " +
        "Set at least one of business.bookingUrl, business.whatsapp or business.phone.",
    );
  }
  if (!business.email) {
    throw new Error("[site mode=live] business.email is required.");
  }
  if (!business.mapUrl) {
    throw new Error("[site mode=live] business.mapUrl is required for the map section.");
  }
  console.info(`[site] live mode ready — conversion channel: ${conversionChannel.kind}`);
}

if (isLive) {
  validateLive();
}
