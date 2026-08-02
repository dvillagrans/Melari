# Astro 5 → Astro 7 + Content Layer Migration — Decision Record

Scope: isolated foundation slices on `staging`. No commits/PRs created.

## Current state (final)

The stack on `staging` is Astro **7.1.6** · React **19.2.8** · Tailwind **4.3.3** ·
TypeScript **5.9.3** · `@astrojs/vercel` **11**. Content collections use the **Content Layer
API** in `src/content.config.ts` (`glob()` loaders + `astro/zod` schemas).

Legacy Content Collections are **not active**: `src/content/config.ts` was replaced by
`src/content.config.ts`, and the `legacy.collections` flag was removed from
`astro.config.mjs`. There is no `type: 'data'` config and no legacy compatibility flag.

Verified: `npm audit` → **0 vulnerabilities**; `npm run build` (`astro check && astro build`)
→ **0 errors / 0 warnings / 0 hints**, **8 static pages**.

## Historical record — Astro 5 foundation slice

The first slice upgraded the base stack from Astro 4 to Astro 5 (LTS line) with React 19,
keeping Tailwind 3 so visual migrations stayed decoupled from the framework upgrade.

| Package | Before | After | Notes |
|---|---|---|---|
| `astro` | `^4.12.2` | `^5.18.2` | Latest 5.x at the time |
| `@astrojs/react` | `^3.6.0` | `^4.4.2` | Astro 5 line; peer react `^17\|\|^18\|\|^19` |
| `@astrojs/tailwind` | `^5.1.0` | `^6.0.2` | Removed later in the Tailwind 4 migration |
| `@astrojs/vercel` | `^7.7.2` | `^8.2.11` | Later bumped to `^11.0.4` |
| `@astrojs/check` | `^0.8.2` | `^0.9.10` | Supports Astro 5 + TS 5 |
| `react` / `react-dom` | `^18.3.1` | `^19.2.8` | React 19 stable |
| `@types/react` / `@types/react-dom` | `18` | `19` | Match React 19 |
| `tailwindcss` | `^3.4.6` | `^3.4.6` | Kept on v3 during the Astro 5 slice |
| `@fortawesome/*` | present | removed | No usages found in `src/` |

At that point the project still used the Astro 4-style `src/content/config.ts` collections
(`defineCollection` with `type: 'data'`) and the legacy flag was enabled for the slice:

```js
legacy: {
  collections: true,
},
```

**Superseded:** the legacy flag was a temporary compatibility decision for the Astro 5
slice only. It was fully removed in the follow-up migration below — legacy Content
Collections are **no longer active** in this repository.

## Final migration — Astro 7 + Content Layer + Tailwind 4 (applied)

The follow-up slice migrated the legacy collections to the Content Layer API, upgraded the
framework to Astro 7 (security line), and moved Tailwind to v4 via its Vite plugin.

| Item | Before | After |
|---|---|---|
| `astro` | `^5.18.2` | `^7.1.6` (Vite 8, Rust compiler, Node >= 22.12) |
| `@astrojs/vercel` | `^8.2.11` | `^11.0.4` (peer astro `^7`) |
| `@astrojs/react` | `^4.4.2` | `^6.0.2` (peer react `^17\|\|^18\|\|^19`) |
| `tailwindcss` | `^3.4.19` | `^4.3.3` via `@tailwindcss/vite` plugin in `astro.config.mjs` |
| `@astrojs/tailwind` / `tailwind.config.cjs` | present | removed (no config file; v4 is plugin-driven) |
| Content config | `src/content/config.ts` (`type: 'data'`) | `src/content.config.ts` (`glob()` loaders + `astro/zod` schemas) |
| `astro.config.mjs` | `legacy.collections: true` | flag removed; `compressHTML: true` preserves Astro 5 whitespace handling |
| overrides | — | `path-to-regexp@6.3.0` (GHSA-9wv6-86v2-598j) and `vite@8.2.0` (single-Vite tree) |

Notes:
- The four YAML collections (`services`, `highlights`, `testimonials`, `stats`) are loaded
  with `glob({ base: './src/content/<name>', pattern: '**/*.yaml' })`. Entry IDs equal the
  legacy filename stems, so the `services.astro` sort by `id` and `getStaticPaths()` props
  are unchanged.
- `getCollection()` calls and `provisional`/`featured` filters in `src/pages/` are
  unchanged; the Content Layer API preserves `entry.data` and filter callbacks.
- `@vercel/routing-utils` still pins `path-to-regexp@6.1.0`; the override forces the
  patched `6.3.0`. Astro's own Vite is 8.2.0; the override forces every Vite consumer
  (`@tailwindcss/vite`, `@vitejs/plugin-react`) to the same version to avoid the npm
  dedupe error `invalid: esbuild@0.25.12`.
- Tailwind v4 needs no `tailwind.config.cjs`; the `@tailwindcss/vite` plugin is wired in
  `astro.config.mjs` under `vite.plugins`.

Verification evidence (2026-08-02, on `staging`):
- `npm audit` and `npm audit --omit=dev` → `found 0 vulnerabilities`.
- `npm run build` (`astro check && astro build`) → **0 errors / 0 warnings / 0 hints**,
  **8 static pages** (same routes: `/`, `/about`, `/contact`, `/services`, and 4
  non-provisional service detail pages).
- `git branch --show-current` → `staging` before and after; `main` untouched (`e68872b`).

## Lockfile

- `package-lock.json` was regenerated from scratch against `registry.npmjs.org`.
- The previous lockfile pinned 118 tarballs to `registry.npmmirror.com`, which this npm
  environment refuses to fetch (`EALLOWREMOTE`). The regenerated lockfile uses a single
  registry and installs cleanly with `npm install` / `npm ci`.
- `node_modules` was a pnpm-layout tree (`.pnpm` virtual store) that breaks npm arborist;
  it was removed and reinstalled with npm. npm is the official package manager;
  `pnpm-lock.yaml` does not exist.

## Rollback

Restore the pre-migration source and lockfile, then reinstall:

```
git checkout -- package.json astro.config.mjs package-lock.json
git checkout -- src/env.d.ts src/pages src/components src/icons src/layouts
git restore --source=HEAD -- tailwind.config.cjs
rm src/content.config.ts
```

Restore `src/content/config.ts` from the Astro 5 slice and remove this doc; `node_modules`
can be reinstalled from the restored lockfile. No commit was created on either slice.
