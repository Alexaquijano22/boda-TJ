# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Wedding invitation site for Tatiana & Juan Carlos (wedding date: 20 de noviembre, 2026), built with **Next.js** (App Router, JavaScript, no TypeScript). Originally a single static `index.html`; migrated to Next.js for componentized structure and real interactivity (live countdown, stateful RSVP form, carousel with position indicators). Deployed on Vercel.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start     # serve the production build locally
npm run lint
```

There is no test suite.

**Image optimization is disabled** (`images.unoptimized: true` in [next.config.mjs](next.config.mjs)) — the built-in `/_next/image` optimizer endpoint failed to resolve images reliably during development, so `next/image` is used only for its layout/`fill`/`object-fit` ergonomics, not for on-the-fly resizing. Images are served as-is from `public/images/`. If revisiting this, re-test the optimizer before re-enabling it.

## Architecture

- `app/layout.js` — root layout; loads fonts via `next/font/google` (Playfair Display + Be Vietnam Pro, exposed as CSS variables `--font-display`/`--font-body`) and sets page metadata.
- `app/globals.css` — CSS custom properties on `:root` (`--surface`, `--primary`, etc., same token names as the original static site) plus shared utility classes used across components as plain global class names: `.page`, `.eyebrow`, `.divider` (with `.line`/`.dot` children, and an `.on-dark` modifier for use over photos).
- `app/page.js` — assembles the page by stacking section components in order: Hero → Historia → Galeria → Detalles → Rsvp → footer.
- `app/components/` — one component + co-located CSS Module per section:
  - `Hero.js` / `Countdown.js` — hero banner with a client-side live countdown to the wedding date/time (`Countdown.js` is a `"use client"` component using `setInterval`).
  - `Historia.js` — static couple's-story text, no interactivity.
  - `Galeria.js` — client component; horizontally-scrolling carousel (`scroll-snap`) with prev/next buttons and dot indicators kept in sync via an `onScroll` handler that finds the closest slide to center.
  - `Detalles.js` — static event-details card.
  - `Rsvp.js` — client component; controlled form (`useState`) with HTML5 `required` validation on the name field, and a success view swapped in on submit. Submission is **still simulated** — form data is only `console.log`'d, no backend call. If wiring up real submission, this is where it goes.
- Images live in `public/images/*.jpg` and are referenced either via static `import` (for `next/image` in Hero/Rsvp) or by path string (`/images/...` in the gallery loop).

### CSS Modules gotcha

Several original styles used descendant selectors on shared/global class names (e.g. `.divider .line`, `.radio-row label.opt`). Inside a CSS Module, every class token in a selector gets scoped, including nested ones — so a plain global `className="line"` won't pick up a module rule like `.iconDivider .line`. Where this pattern is needed, either give the child element the module's own scoped class (e.g. `styles.line`, `styles.opt`, as done in `Rsvp.js`) or, for a modifier meant to apply to the shared global `.divider` class across multiple components, define it in `globals.css` instead (see `.divider.on-dark`).

## Content notes

Text content (names, date, venue, story copy) is in Spanish and hardcoded directly in the JSX — there's no CMS or data file to edit instead.

## History

[CHECKLIST.md](CHECKLIST.md) documents the earlier optimization pass on the original static `index.html` (before the Next.js migration) — image extraction from base64 and RSVP validation, kept for historical reference.
