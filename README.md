# Dev Portfolio

A calm, editorial portfolio for Tim Finch. Built with Next.js 16, TypeScript, and Tailwind CSS, it presents projects, writing, and current work with a restrained visual system and a content-first structure.

## What It Includes

- Editorial home page with featured projects and live telemetry
- Project archive with search and statically generated case studies
- Writing archive with structured long-form entries and build threads
- About page with a concise working profile and social links
- Lightweight API routes for portfolio search and telemetry fallback data

## Visual System

The site uses a warm, low-contrast palette and a typographic hierarchy that keeps the experience calm and readable.

- Warm paper background and near-black text
- Muted supporting copy
- Thin borders and soft translucent surfaces
- Serif editorial headings paired with a clean sans-serif body stack
- Rounded pill navigation and actions
- Subtle hover and focus states

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Vercel Analytics

## Content Model

Content lives in local data files so the site stays easy to update and statically render.

- [`src/data/projects.ts`](src/data/projects.ts) for project content
- [`src/data/writing.ts`](src/data/writing.ts) for essays and build threads
- [`src/data/profile.ts`](src/data/profile.ts) for about/profile copy
- [`src/data/telemetry.ts`](src/data/telemetry.ts) for live and fallback telemetry content

## Routes

- `/` home
- `/projects` project archive
- `/projects/[slug]` project case studies
- `/writing` writing archive
- `/writing/[slug]` long-form writing entries
- `/about` bio and links
- `/api/ask` local portfolio search endpoint
- `/api/telemetry` telemetry feed with fallback content

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Useful Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Deployment

The site is designed for Vercel.

```bash
vercel
vercel --prod
```

## Notes

- The writing content is the source of truth for long-form editorial pages.
- The project archive is generated from local data, so new entries should keep slugs stable.
- Keep route and metadata changes in sync with the static content model.

## License

MIT. See [`LICENSE`](LICENSE).
