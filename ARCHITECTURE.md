# Architecture

This portfolio is a Next.js 16 App Router site built around local content, static generation, and a small set of focused client islands.

## Principles

- Keep content in data files, not inline in route components.
- Prefer server components by default.
- Use client components only for state, effects, event handling, or navigation hooks.
- Keep the visual system minimal, editorial, and content-led.
- Preserve stable slugs and route contracts.

## Content Flow

- `src/data/projects.ts` stores project records.
- `src/data/writing.ts` stores essays, build threads, and reusable summary copy.
- `src/data/profile.ts` stores profile copy and principles.
- `src/data/telemetry.ts` stores live and fallback telemetry content.

Route components consume those modules and render them into static pages or dynamic pages with `generateStaticParams()`.

## Route Structure

- `src/app/page.tsx` renders the homepage.
- `src/app/projects/page.tsx` renders the project archive.
- `src/app/projects/[slug]/page.tsx` renders project case studies.
- `src/app/writing/page.tsx` renders the writing archive.
- `src/app/writing/[slug]/page.tsx` renders long-form writing entries.
- `src/app/about/page.tsx` renders the profile page.
- `src/app/api/ask/route.ts` serves local portfolio search.
- `src/app/api/telemetry/route.ts` serves telemetry fallback data.

## Styling System

- Global tokens live in `src/app/globals.css`.
- Shared layout width comes from `Container`.
- Editorial surfaces use soft borders, muted backgrounds, and restrained shadows.
- Serif typography is reserved for display headings and quotes.
- Navigation and actions use rounded pills with subtle hover states.

## Data and Rendering

- Project and writing detail routes are statically generated from local content.
- Missing content should use `notFound()`.
- Page metadata is derived from the underlying content model.
- Client components are isolated to telemetry, search, and pathname-aware navigation.

## Deployment

- The site is designed for Vercel.
- `npm run lint` checks code and content consistency.
- `npm run build` validates route generation, metadata, and static output.

