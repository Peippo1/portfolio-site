@AGENTS.md

# Claude Notes

- This is a Next.js 16 App Router portfolio site for Tim Finch.
- Keep the calm editorial tone, the minimal visual language, and the content-driven structure intact.
- Prefer small, targeted edits in the relevant data module or component instead of broad refactors.
- Read `node_modules/next/dist/docs/` before changing App Router code, especially pages, layouts, dynamic routes, loading states, and route handlers.
- In this codebase, `params` and `searchParams` are promises in page, layout, and route APIs. Await them instead of treating them like plain objects.
- Use `generateStaticParams()` for the project and writing slugs that come from local data.
- Call `notFound()` for missing slugs or invalid content.
- Keep client components limited to real browser needs such as state, effects, events, and navigation hooks.
- Verify route, metadata, or API changes with `npm run lint` and `npm run build`.
