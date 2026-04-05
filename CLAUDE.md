# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm lint` — run ESLint (flat config, ESLint 9)
- No test runner configured

## Tech Stack

- Next.js 16.2.2 (App Router) / React 19 / TypeScript 5
- Tailwind CSS v4 via `@tailwindcss/postcss` — theme defined in `src/app/globals.css` using `@theme` block (no tailwind.config file)
- Geist + Geist Mono fonts loaded via `next/font/google`
- pnpm as package manager

## Architecture

This is a developer portfolio site. All pages are statically generated.

**Routing**: `src/app/` uses App Router. Project detail pages at `src/app/projects/[slug]/page.tsx` use `generateStaticParams()` for SSG. The `params` prop is a `Promise` in Next.js 16 — must be awaited.

**Data layer**: `src/data/projects.ts` exports a `Project` interface and a hardcoded array. `getProject(slug)` and `getAllProjectSlugs()` are the lookup helpers. To add a project, add an entry to the `projects` array — no database or CMS.

**Components**: `src/components/` — all are server components (no `'use client'`). `Section` is the standard layout wrapper used across pages.

**Styling**: Dark theme only. Custom neutral palette (50–950) and accent color defined in `globals.css` `@theme` block. Uses `font-mono` for technical accents (IDs, tags, nav brand). Path alias `@/*` maps to `./src/*`.
