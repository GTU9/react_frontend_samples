# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single Vite + React 18 + TypeScript app that showcases **18 self-contained frontend design samples** (each a distinct page type × visual style) grouped into 6 web-purpose categories, browsable through a thumbnail gallery with `react-router-dom` routing. All content is Korean; data is mock-only (no backend/API). Styling is Tailwind v4 (CSS-first) plus a per-sample scoped CSS file; animation uses framer-motion.

## Commands

```bash
npm run dev        # dev server (http://localhost:5173; auto-bumps port if busy). No "start" script.
npm run build      # tsc -b (typecheck, all of src) + vite build — the authoritative gate
npm run typecheck  # tsc -b only
npm test           # vitest run — jsdom render smoke tests for all 18 samples + gallery
npx vitest run src/test/samples.smoke.test.tsx -t "flow-crm"   # run a single test by name
node scripts/visual-qa.mjs http://localhost:4173   # Playwright: screenshot 38 pages + collect per-page console errors (needs `npm run preview` running first; requires `npx playwright install chromium`)
```

`npm run build` runs `tsc -b` which uses a project-references layout: root `tsconfig.json` → `tsconfig.app.json` (app, scoped to `src`) + `tsconfig.node.json` (vite config). A bare `tsc --noEmit` will NOT typecheck the app correctly — always use `tsc -b` / `npm run build`.

## Architecture — the registry is the backbone

`src/samples/registry.ts` is the single source of truth. It exports the `samples: Sample[]` array; **both** the gallery and the router derive everything from it:

- `src/App.tsx` — `BrowserRouter` routes: `/` → `Gallery`; `/sample/:id` → looks up via `getSample(id)` and renders `SampleFrame`; unknown id and `*` both `<Navigate to="/" replace/>`.
- `src/showcase/Gallery.tsx` — groups samples by category (`samplesByCategory()`), renders a sticky category quick-nav + card grid. Card pills/headings use the Korean label maps (`categoryLabels`, `pageTypeLabels`, `visualStyleLabels`) — never render the raw English enum.
- `src/showcase/SampleFrame.tsx` — sticky "← 갤러리" back link + `<ErrorBoundary><Suspense>` wrapping the lazy sample `Component`. Each sample is `React.lazy(() => import('./<slug>'))`, so it is code-split.

Adding a sample = create `src/samples/<slug>/index.tsx` (+ `mock.ts`, + `<slug>.css`) and add one entry to `registry.ts`. Type unions (`PageType`, `VisualStyle`, `Category`) live in the registry; extend them there.

## Per-sample integration contract (load-bearing — do not break)

Each `src/samples/<slug>/`:
- `index.tsx` **default-exports** a component whose root element has className **`.sample-<slug>`** (exact slug). The registry lazy-imports this; the smoke test asserts `.sample-<slug>` mounts.
- All custom CSS lives in `<slug>.css` imported locally and **scoped under `.sample-<slug>`**. NEVER use `:root` / `body` / `html` / bare-element selectors in a sample's CSS — the gallery renders all six visual identities on one page, so any global selector leaks across every sample. Only `src/index.css` may touch global/`:root`.
- Owns its own mock data in `mock.ts`. Samples are independent: do not import across sample folders, and do not touch `registry.ts` / `App.tsx` / `Gallery.tsx` / `SampleFrame.tsx` from within a sample.

## Animation & accessibility conventions

- Animate **transform / opacity / filter / box-shadow** (and SVG `pathLength` / `stroke-dashoffset`) only — avoid animating layout props (width/height/top/left); use `transform: scaleX` for bars.
- Every animation must respect reduced motion: gate framer-motion with `useReducedMotion()` and add a CSS `@media (prefers-reduced-motion: reduce)` fallback that shows final state instantly.
- **No `AnimatePresence` at the router level** (kept out of `App.tsx`/`SampleFrame.tsx` to avoid Suspense/transition console errors).
- A component used as a direct child of `AnimatePresence mode="popLayout"` must be a `motion.*` or `forwardRef` component (see `flow-crm` `DealCard`) — a plain function component triggers a React ref warning that fails the smoke test.

## Verification gates

Three layers, all expected green before claiming done:
1. `npm run build` (types + production build, 18 lazy chunks).
2. `npm test` — `src/test/samples.smoke.test.tsx` mounts every sample in jsdom and asserts **zero `console.error`**. `src/test/setup.ts` polyfills jsdom gaps (matchMedia, IntersectionObserver, ResizeObserver, scrollIntoView); `vitest.config.ts` uses `css: false`, so CSS imports are ignored in tests.
3. `scripts/visual-qa.mjs` — real Chromium screenshots (desktop 1440 + mobile 390) + per-page console-error capture to `.omc/visual-qa/report.json`. Runs with `reducedMotion: 'reduce'` and scrolls each page so `whileInView` sections are captured.

## Conventions

- **Avoid emojis** in documentation, headings, code comments, and commit messages (project preference). Exception: emojis already used as functional UI/design content inside samples (e.g. `fresh-market` produce icons, `board-tasks` project icons) are intentional — leave them unless asked.

## Notes

- `.omc/` (specs, plans, visual-qa artifacts, session state) is gitignored; treat `.omc/specs/` and `.omc/plans/` as historical design context, not instructions.
- Windows dev environment: git shows LF→CRLF warnings (harmless).
