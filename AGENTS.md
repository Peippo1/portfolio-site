<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may differ from older Next.js examples. Read the relevant guide in `node_modules/next/dist/docs/` before writing any App Router code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio Site Instructions

This repository is a Next.js 16 App Router portfolio for Tim Finch. Treat the content files as the source of truth and keep the site calm, editorial, and minimal.

## Project Map

- `src/app` holds routes, layouts, metadata, loading states, and route handlers.
- `src/components` holds shared UI and small client islands.
- `src/data` holds profile, project, writing, and telemetry content.
- `src/lib` holds search, telemetry normalization, and GitHub metadata helpers.
- `src/types/content.ts` defines the shared content model.

## Next.js Rules

- Read the local Next.js docs in `node_modules/next/dist/docs/` before changing App Router files.
- `params` and `searchParams` are promises in page, layout, and route APIs. Await them or use `use()` in client components.
- Use `generateStaticParams()` for dynamic routes backed by local content.
- Use `notFound()` for missing slugs and invalid content.
- Keep `loading.tsx` lightweight and segment-scoped.
- Use `usePathname()` only in client components, not in server layouts.
- Keep route handlers under `src/app/api` and return stable JSON or `Response` shapes.

## Editing Rules

- Server Components are the default. Add `"use client"` only when a component needs state, effects, event handlers, or browser APIs.
- Do not move logic into client components unless it truly needs to run in the browser.
- Preserve the existing typography, spacing, and CSS-variable-based design system.
- Reuse `Container`, `PageIntro`, `font-editorial`, and the established border-driven layout patterns.
- Keep copy concise, factual, and consistent with the current editorial voice.
- Do not overwrite unrelated worktree changes.

## Content Rules

- Project content lives in `src/data/projects.ts`.
- Writing content lives in `src/data/writing.ts`.
- Profile copy lives in `src/data/profile.ts`.
- Telemetry copy and fallback data live in `src/data/telemetry.ts`.
- Shared content types live in `src/types/content.ts`.
- GitHub freshness metadata lives in `src/lib/github-metadata.ts`.
- Keep slugs unique and stable because the routes depend on them.
- If you add a project or writing entry, make sure the relevant static params and metadata still resolve correctly.
- Keep the `/api/ask` and `/api/telemetry` response contracts stable because client components depend on them.

## Route Notes

- `/` combines the hero, live telemetry, and featured projects.
- `/projects` uses local search plus static project data.
- `/projects/[slug]` is statically generated from the project dataset.
- `/writing` lists the writing archive.
- `/writing/[slug]` renders structured blocks and series navigation.
- `src/app/api/ask/route.ts` accepts POST JSON with `{ query }`.
- `src/app/api/telemetry/route.ts` serves the telemetry fallback feed with caching headers.

## Verification

- Run `npm run lint` for code and content changes.
- Run `npm run build` after touching routes, metadata, dynamic segments, or route handlers.
- Check `/`, `/projects`, `/projects/[slug]`, `/writing`, and `/writing/[slug]` after route or content changes.
