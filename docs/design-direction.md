# Melari Premium — Design Direction

Decision record for the premium visual redesign of the Melari pilot. Scope:
`staging` only, never `main`. Commits land as small, reviewable units, each
preserving the honest "pendiente de verificación" gating for unverified
business data.

## 1. Current state diagnosis

The pilot (commit `1e63d2f`) is functionally solid (Astro 7 · Content Layer ·
Tailwind 4 · React islands) but visually generic and template-like:

- **Hero** — full-bleed background with a centered gradient overlay and
  left-aligned text; a hard `bg-black/60` linear gradient dominates the image.
- **Cards everywhere** — services, projects, testimonials all use the same
  white rounded card with identical `shadow-card`, `rounded-2xl`/`rounded-3xl`,
  and centered text. Zero visual hierarchy between sections.
- **Typography** — `DM Serif Display` for headings at `50px` and `Jost` for
  body at `22px`, repeated with the same `tracking-tight` everywhere; no
  rhythm, no contrast scale, no editorial interplay.
- **Motion** — one identical "reveal on scroll" transition repeated across
  every island; generic `transition-all`, `ease-out-smooth`, 700–1000ms.
- **Palette** — teal `#04acbc` used simultaneously as primary, accent, and
  CTA color; `#b4cccc` for surfaces and `#1b2534` for text. Sections swap
  background roles without a coherent system.
- **Repeated motifs** — every page starts with a full-width banner + white
  "breadcrumb" card with rounded top corners; every section title is centered.
- **Decoration** — unused `one.tsx`…`four.tsx` number glyphs and quote
  patterns exist but are not composed; social icons hardcode `#292F36`.

The redesign keeps every asset and every word of approved copy; it changes
**composition, hierarchy, rhythm, and interaction**, not content.

## 2. Design intent

A small premium spa whose website should feel like a well-set editorial page:
quiet luxury, generous whitespace, confident typography, and restrained,
purposeful motion. Reference: high-end print/magazine composition with a
contemporary web layer (smooth scroll reveals, fine hover states, focus
visibility).

Governing principles:

1. **Editorial composition** — asymmetric grids, off-center type blocks,
   overlapping/nested media, deliberate empty space. Nothing centered-for-
   centering's-sake.
2. **Typography-led hierarchy** — one display face for oversized moments
   (hero, section numerals), one working face for labels/body; a small set of
   scale steps with clear roles (eyebrow, display, subhead, body, caption).
3. **Restrained palette** — keep the existing Melari teal as the single brand
   accent; introduce neutrals (ink, bone, sand) from the existing images;
   delete arbitrary greys. Contrast is created by scale and space, not color
   noise.
4. **Purposeful motion** — every animation explains a spatial relationship
   (image lifting, underline drawing, staggered stagger only where it serves
   hierarchy). Honors `prefers-reduced-motion` at the CSS and JS level.
5. **No AI-slop tokens** — no generic gradients (only tasteful scrims over
   real photography), no glassmorphism panels, no blobs, no arbitrary
   decorative colors, no repeated identical cards, no template hero.

## 3. Typography system

Fonts already loaded: **DM Serif Display** (display) and **Jost** (working).

| Role | Face / weight | Size (desktop) | Tracking / leading |
|---|---|---|---|
| Eyebrow / label | Jost 500 · uppercase | 12–13px | 0.28–0.32em |
| Display (hero) | DM Serif Display · 400 | clamp(3rem, 8vw, 6.5rem) | 1.02 leading |
| Section heading | DM Serif Display · 400 | 42–56px | 1.05 leading |
| Subheading | Jost 500 | 22px | normal |
| Body | Jost 400 | 17–19px | 0.01em, 1.65 leading |
| Caption / small | Jost 400 | 14px | 0.02em |

Global rules in `global.css`:

- `h1–h3` default to the display face; section headings can opt into a
  `text-balance` and a max measure.
- Body copy gets a comfortable measure (`max-w-prose`-ish, ~65ch) — the
  current 22px/33px across the whole site flattens hierarchy.
- Eyebrows are used as a consistent section opener: small caps + rule line.

## 4. Color tokens (from existing brand)

Kept as-is (brand): teal `#04acbc` (primary), deep ink `#1b2534` (text),
muted teal `#0e8491` / `#39676b` (derived accents).

New neutral system (aligned to the photography, not invented):

| Token | Value | Use |
|---|---|---|
| `--color-ink` | `#1b2534` (existing text-blue) | primary text, dark sections |
| `--color-ink-soft` | `#4d4f52` (existing text-gray) | secondary text |
| `--color-bone` | `#f7f5f0` | warm paper background |
| `--color-sand` | `#efe9e0` | softer paper / hairlines |
| `--color-line` | `rgba(27,37,52,.14)` | hairlines, dividers |
| `--color-teal` | `#04acbc` (existing primary) | single brand accent |

Delete the redundant `primary-*` aliases where they collide; keep the brand
hexes, expose them under semantic names (`--color-accent`, `--color-ink`,
`--color-paper`). Sections alternate between `--color-main` (white),
`--color-bone` (warm paper) and the deep ink `--color-ink` for the final
editorial band — three background tones max, chosen deliberately.

## 5. Composition system

- **Container**: `max-w-[1200px]` stays, but sections get generous vertical
  rhythm (`pt-[120px]` desktop, `pt-[72px]` mobile) instead of `100px` +
  repeated `100px`.
- **Asymmetric grids**: services section uses a 12-col grid where cards have
  different column spans and top offsets (staggered by `mt-*`), not an
  even 3-up row. Projects use a 2-col grid with a large/small editorial
  alternation.
- **Media treatment**: images get rounded corners with a **paper frame**
  (1px sand border + generous white padding) instead of bare `rounded-card`;
  hover lifts the image inside the frame (scale 1.02–1.03, not 1.05), with a
  fine caption below.
- **Hairlines**: section headers use a thin rule (`h-px bg-line`) rather than
  centered headings; numbering ("01 / Servicios") as editorial index markers.
- **Footer**: a dark ink band with hairline dividers, three text columns
  (brand + nav + contact), and socials as bordered circles. The current
  "Copyright ©" strip is folded into the band.

## 6. Motion system

All transitions gated by `motion-reduce:` and the `.js` reveal fallback already
in place (`reveal-init`/`revealed`). New rules:

- **Reveal**: single `translateY(24px)` + `opacity`, 700ms, one `ease` curve
  (`--ease-out-smooth` kept). Stagger only where it maps to real hierarchy
  (cards in a row), max 3 steps, `transition-delay` from index.
- **Hover**: links get an underline that draws in from the left
  (`background-size` trick); buttons get a subtle translate + shadow; images
  get a 400ms scale inside their frame.
- **Focus**: every interactive element gets a visible 2px outline with
  `outline-offset-4` in teal — already partially present, made consistent.
- **Navbar**: transparent at top → paper/ink scrim + hairline on scroll; the
  mobile menu stays a full overlay but with a proper focus trap (already
  present) and reduced motion support.

## 7. What is intentionally NOT redesigned

- **Copy** — every approved sentence stays; only micro-tweaks for
  punctuation/case where the design needs it.
- **Assets** — the same photos (`/banner.webp`, `/about.webp`, `Service1-3.png`,
  `project1-4.jpg`, portraits) are reused; no new imagery is generated.
- **Honest gating** — "pendiente de verificación" placeholders, disabled
  submit, disabled booking CTA and the TimeUp note remain visible but are
  restyled into the new system (they are truthful states, not decoration).
- **Routes/content model** — no new pages, no content collection changes.

## 8. Section-by-section plan

| Section | Change |
|---|---|
| Navbar | Scrolled state uses paper/ink scrim + hairline; underline hover; CTA refined; mobile menu restyled, motion-safe. |
| Hero | Two-column asymmetric composition: display type overlapping the image column, eyebrow + rule, no heavy gradient — soft scrim only at the text side; the image becomes a framed editorial photograph with a caption band. |
| Services (highlights) | 12-col staggered grid, numbered index, paper frames, fewer/zero repeated cards. |
| About | Split with a large framed image + offset caption, numbered eyebrow, asymmetric text block. |
| Video | Editorial band on bone background; title left-aligned with rule; the video sits in a paper frame, play is native but styled; reduced-motion disables autoplay (already done). |
| Contact | Split layout: info column on ink band, form with hairline inputs and real labels; the disabled submit stays but is styled as a truthful state. |
| Maps | Placeholder restyled as an editorial note card, not a gray box. |
| Footer | Ink band, hairline dividers, three columns, bordered socials, folded copyright. |
| Services pages | Banner replaced by editorial page header (eyebrow + breadcrumb), grid with paper frames, detail pages get a wider composition. |

## 9. Verification

- `npm run build` → `astro check && astro build`, 0 errors / 0 warnings /
  0 hints.
- Manual checks at 375 / 768 / 1280: hero type never overflows, grids collapse
  to single column, no horizontal scroll, `prefers-reduced-motion` hides all
  motion, focus rings visible on keyboard nav.
- Commits: one small unit per section, each with its own build pass.
