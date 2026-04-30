# Contributing

Thanks for helping improve the portfolio.

## Working Rules

- Keep changes small and focused.
- Preserve the calm editorial voice and visual system.
- Treat the content files as the source of truth.
- Avoid changing route behavior unless the content model requires it.
- Do not overwrite unrelated worktree changes.

## Local Workflow

```bash
npm install
npm run lint
npm run build
```

For content-only updates, lint is usually enough. For route, metadata, or dynamic segment changes, run the build as well.

## Content Updates

- Update project content in `src/data/projects.ts`.
- Update writing content in `src/data/writing.ts`.
- Update profile copy in `src/data/profile.ts`.
- Update telemetry content in `src/data/telemetry.ts`.

Keep slugs stable so existing routes continue to resolve.

## Pull Requests

- Describe the user-facing change clearly.
- Note any content or route impact.
- Mention verification steps that were run.

