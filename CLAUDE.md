# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NOVARA landing page — a single-page marketing site for a medical AI company. Built with Next.js 12 (static export), React 17, TypeScript, and Tailwind CSS (JIT mode).

## Commands

- **Dev server**: `yarn dev` (runs on localhost:3000)
- **Build**: `yarn build`
- **Production build + export**: `yarn build-prod` (cleans, builds, exports static HTML to `out/`)
- **Lint**: `yarn lint` (Next.js ESLint)
- **Type check**: `yarn build-types`

Note: All build/dev commands use `NODE_OPTIONS=--openssl-legacy-provider` due to older Node compatibility.

## Architecture

### Content-Driven via JSON Config

All page content (navigation, hero text, team members, projects, product offerings) is defined in `src/config/index.json`. Components read from this config — to change copy, images, or team info, edit the JSON file rather than component code.

### Page Structure

Single page (`src/pages/index.tsx`) composed of sections in order: HeroSection → Product → Pricing (team) → Projects → About. Each section is a standalone component in `src/components/`.

### Hero Section with Canvas Animations

`HeroSection.tsx` combines Header, MainHero text, and two canvas-based animations:
- `HexNetAnimation.tsx` — hexagonal network background (logic in `src/utils/hexNet.ts`)
- `NetworkGraphAnimation.tsx` — particle network graph (logic in `src/utils/networkAnimation.ts`)
- `Canvas.tsx` — shared canvas wrapper component using `src/hooks/useCanvas.ts`

### Styling

- Tailwind CSS with custom theme in `tailwind.config.js` (brand colors: primary `#2685ba`, secondary `#24272B`)
- Custom font: Google Sans (configured in tailwind as `font-sans` and `font-play`)
- Global styles in `src/styles/main.css`
- `framer-motion` for scroll-triggered animations via `LazyShow.tsx`

### Static Assets

Images go in `public/assets/images/` and are referenced in `src/config/index.json`. Next.js image optimization is disabled (`unoptimized: true` in next.config.js).

### ESLint Config

Uses airbnb-typescript + prettier. Lint-staged runs ESLint fix + type checking on commit via Husky.
