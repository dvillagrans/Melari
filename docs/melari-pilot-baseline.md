# Melari Pilot — Baseline and Current State

Baseline record for the Melari pilot site, scoped by **epic [#1](https://github.com/dvillagrans/Melari/issues/1)** and its **scope comment** (2026). Per that comment, this repository tracks only inventory, content, identity, migration, approval, domain, cutover, and client evidence for the pilot. Everything reusable (TimeUp Websites engine, plugin lifecycle, multi-tenancy, domains/revisions, shared renderer, TimeUp contract, commercial operation) belongs to **dvillagrans/TimeUp#890** and is **out of scope here**.

Current status: **pilot baseline implemented on `staging`, uncommitted, build green (0 errors / 0 warnings / 0 hints), 8 static pages, on Astro 7.1.6 · React 19.2.8 · Tailwind 4.3.3 with Content Layer collections (`src/content.config.ts`).** Publishing visibility is gated behind `provisional` flags; all external integrations are intentionally disabled and honestly labeled until their business/external blockers clear.

## Quick path

1. Branch: `staging` — do not commit to `main`.
2. Build evidence: `npm run build` (`astro check && astro build`) → **0 errors / 0 warnings / 0 hints**, **8 pages**.
3. Current scope: baseline + content migration + provisional gating. Booking/email/map/NAP remain blocked.
4. Rollback: restore `e68872b` and drop untracked pilot paths; `main` untouched.

## Repository and stack

| Area | Value |
|---|---|
| Branch / HEAD | `staging` @ `e68872b` ("cambios") — identical to `origin/main` |
| Stack | Astro 7.1.6 · React 19.2.8 · Tailwind 4.3.3 · TypeScript 5.9.3 · `@astrojs/vercel` 11 (see `docs/astro5-upgrade.md`) |
| Runtime (local) | Node v22.23.1 · npm 12.0.1 |
| Lockfile | `package-lock.json` (tracked; regenerated against `registry.npmjs.org` in the Astro 7 slice). npm is the official package manager; `pnpm-lock.yaml` does not exist |
| Git state | 41 modified + `tailwind.config.cjs` deleted (Tailwind 4 via `@tailwindcss/vite`) + untracked `.github/`, `docs/`, `src/content/`, `src/content.config.ts`, `src/lib/`, `src/pages/services/`, `src/styles/`, `public/robots.txt`, `.atl/` |

## Routes (current)

Static output of the build — 8 pages:

| Route | Source | Status |
|---|---|---|
| `/` | `src/pages/index.astro` | completed |
| `/about` | `src/pages/about.astro` | completed |
| `/contact` | `src/pages/contact.astro` | completed |
| `/services` | `src/pages/services.astro` | completed |
| `/services/ventosas-terapeuticas` | `src/pages/services/[slug].astro` | completed |
| `/services/masajes-relajantes` | `src/pages/services/[slug].astro` | completed |
| `/services/faciales-de-lujo` | `src/pages/services/[slug].astro` | completed |
| `/services/faciales-hidratantes` | `src/pages/services/[slug].astro` | completed |

Detail pages are generated only for non-provisional services (4 of 16). No route is broken by the migration; URLs are preserved from the original inline arrays.

## Content collections and provisional visibility

Collections defined in `src/content.config.ts` (Content Layer `glob()` loaders + `astro/zod` schemas; the legacy `src/content/config.ts` was replaced):

| Collection | Entries | Provisional | Published (current) |
|---|---|---|---|
| `services` | 16 | 12 (ids 05–16) | 4 (ids 01–04, `featured: true`) |
| `highlights` | 3 | 0 | 3 |
| `testimonials` | 1 (raul-magana) | 1 | 0 (hidden) |
| `stats` | 3 | 3 | 0 (hidden) |

Visibility rules applied in pages:

| Surface | Filter | Result |
|---|---|---|
| `/services` grid | `!data.provisional` | 4 cards |
| `/services/[slug]` | `!data.provisional` | 4 detail pages |
| Home projects | `featured && !provisional` | 4 |
| Home testimonials | `!provisional` (guarded by `length > 0`) | hidden |
| Home stats | `!provisional` (guarded by `length > 0`) | hidden |
| Home highlights | none (no flag) | 3 |

Unverified commercial claims (stats, the single testimonial, services 05–16) do **not** appear in the public output.

## Build command and evidence

- Command: `npm run build` → `astro check && astro build`.
- `astro check` (local, `./node_modules/.bin/astro check`): **0 errors, 0 warnings, 0 hints** (54 files).
- `astro build`: **8 page(s) built**, no errors (verified 2026-08-02).
- `npm audit` / `npm audit --omit=dev`: **found 0 vulnerabilities**.
- CI: `.github/workflows/ci.yml` — Node 22, `npm ci`, `npm run build`; triggers on push/PR **to `staging` only**.
- Caveat: CI has not run yet — the slice is uncommitted; `npm ci` relies on the `package-lock.json` regenerated in the Astro 7 slice.

## Known missing assets / unverified content

| Item | Evidence | State |
|---|---|---|
| `project5.jpg` – `project16.jpg` | Referenced by provisional services 05–16 (`/project5.jpg`…`/project16.jpg`); only `project1–4.jpg` exist in `public/` | missing / blocked by business |
| NAP (address, phone, hours) | Rendered as "pendiente de verificación" in `MapsSection`; no verified values | blocked by business |
| Email channel | Contact form submit disabled + note ("canal de correo pendiente") | blocked by business |
| Map embed | Real Google Maps MELARI iframe kept commented out; honest placeholder rendered | blocked by business |
| Domain | None verified; `public/robots.txt` has no `Sitemap`; no `sitemap.xml`, no canonical, no `og:url` | blocked by business |
| Footer social links | Facebook/Instagram icons point to `href="/"` | pending |
| OG/Twitter image | `/banner.webp` (exists) — fine, but no per-page og:url | pending |

## Changes implemented this session (staging, uncommitted)

| # | Change | Files |
|---|---|---|
| 1 | Migrated inline arrays → Astro Content Collections with Zod schemas | `src/content/`, `src/pages/index.astro`, `src/pages/services.astro` |
| 2 | Filtered provisional content from public output (services, projects, testimonials, stats) | `src/pages/services.astro`, `src/pages/index.astro`, `src/pages/services/[slug].astro` |
| 3 | Fixed `lang="es"`, site meta description, favicon path, removed invalid `<meta title>` | `src/layouts/main-layout.astro` |
| 4 | Per-service static routes `/services/[slug]` + `slugify` helper; schema extended (slug, description, duration, price, benefits) | `src/pages/services/[slug].astro`, `src/lib/slug.ts`, `src/content/config.ts` |
| 5 | Below-the-fold hydration `client:load` → `client:visible` | `src/pages/index.astro` |
| 6 | Form a11y: real ids, visible labels, Spanish placeholders | `src/components/contact-form.tsx` |
| 7 | Honest placeholders: contact box (email/phone/website "pendiente de verificación"), map placeholder, disabled submit, disabled booking CTA + TimeUp note | `contact-box.tsx`, `MapsSection.tsx`, `button.tsx`, `contact-form.tsx`, `[slug].astro` |
| 8 | SEO Tier 1: per-page title/description, viewport `initial-scale=1`, OG/Twitter basics, `robots.txt` | `main-layout.astro`, `about.astro`, `contact.astro`, `services.astro`, `[slug].astro`, `index.astro`, `public/robots.txt` |
| 9 | a11y/i18n: navbar aria attributes + `id="mobile-menu"`, breadcrumb "Acerca de", footer "Páginas"/"Contacto", "Qué hacemos", "Qué estás esperando" | `navbar.tsx`, `about.astro`, `footer.tsx`, `MapsSection.tsx` |
| 10 | Fixed broken Tailwind class `text-[1.5Arem]` → `text-[1.5rem]` | `src/components/experience.tsx` |
| 11 | Fixed broken bg reference `/contactpage-bg.jpg` → `/servicespage-bg.jpg` (existing asset) | `tailwind.config.cjs` (since removed — see #14) |
| 12 | CI workflow for `staging` | `.github/workflows/ci.yml` |
| 13 | `env.d.ts` references generated `.astro/types.d.ts` | `src/env.d.ts` |
| 14 | Astro 7 / Tailwind 4 / Content Layer migration: `astro@7.1.6`, `tailwindcss@4.3.3` via `@tailwindcss/vite` (removed `tailwind.config.cjs` and `@astrojs/tailwind`), Content Layer API in `src/content.config.ts` (replaced legacy `src/content/config.ts`), dropped `legacy.collections`, `@astrojs/vercel@11`; build green **0 hints** | `package.json`, `package-lock.json`, `astro.config.mjs`, `src/content.config.ts`, `tailwind.config.cjs` (deleted) |

No commits were made. `package.json` and `package-lock.json` were modified by the final Astro 7 foundation upgrade (Astro 7.1.6 / React 19.2.8 / Tailwind 4.3.3, `package-lock.json` regenerated against `registry.npmjs.org` — see `docs/astro5-upgrade.md`).

## Rollback strategy

- `main` is untouched and identical to `origin/main` (`e68872b`). Rollback = restore that commit on `staging` and delete the untracked pilot paths (`.github/`, `src/content/`, `src/content.config.ts`, `src/lib/`, `src/pages/services/`, `src/styles/`, `public/robots.txt`).
- Runtime dependencies changed only through the final Astro 7 foundation upgrade (Astro 7.1.6 / React 19.2.8 / Tailwind 4.3.3); the lockfile was regenerated against `registry.npmjs.org` and `npm audit` reports **0 vulnerabilities**. No database or infrastructure — `npm ci` reproduces the upgraded state from the regenerated `package-lock.json`.
- Content is gated behind `provisional` flags: removing an entry from public output (or reverting one) is a data-flag change, not a code rewrite.
- `dist/` and `.astro/` are gitignored; CI runs only on `staging`, so `main` is never at risk from this work.

## External blockers

### Blocked by TimeUp#890 contract
- No formal public API contract exists yet. TimeUp#890 proposes `GET /api/public/businesses/:slug`, `/services`, `/services/:id/availability`, `POST /api/public/bookings`, but none are shipped. Booking CTA is therefore **disabled** with an explicit "not yet integrated with TimeUp" note; the booking flow stays **blocked** until the contract is defined and the client is typed.

### Blocked by business (needs client-provided data/approval)
- **Verified NAP** — name, address, phone, hours are placeholders ("pendiente de verificación"); map embed kept commented out.
- **Domain** — no verified production domain; blocks canonical, sitemap, and `og:url`.
- **Email channel** — no provider/configuration; contact form submit disabled.
- **Approved service details and images** — services 05–16 are provisional (no approved copy); `project5–16.jpg` assets do not exist.
- **Testimonial consent** — the single testimonial (Raúl Magaña) is provisional and hidden; requires consent/verification before publishing.

## Status matrix

| Item | Status |
|---|---|
| Baseline/inventory of routes, collections, assets | completed |
| Content migration to Content Collections (Content Layer) | completed |
| Astro 7 / Tailwind 4 / Content Layer migration (0 vulnerabilities, 0 hints) | completed |
| Provisional gating (no unverified claims published) | completed |
| SEO Tier 1 + a11y fixes | completed |
| Per-service detail routes (4 verified services) | completed |
| CI for `staging` | completed (not yet exercised — uncommitted) |
| Staging commit + CI green | pending |
| Verified NAP / map | blocked by business |
| Email channel | blocked by business |
| Production domain / sitemap / canonical | blocked by business |
| Approved copy + images for services 05–16 | blocked by business |
| Testimonial consent | blocked by business |
| TimeUp booking contract & client | blocked by external (TimeUp#890) |
| Multi-tenant website engine, plugin, domains/revisions, shared renderer | out of scope → TimeUp#890 |

## Next step

Commit the pilot slice to `staging` as small, reviewable work units, let CI run, then unblock content items as business approval arrives — **without implementing any TimeUp Websites engine code in this repository**.
