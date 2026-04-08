# Security

This portfolio keeps the security model intentionally small and conservative.

- Client code does not read secrets. Any environment access stays in server-only modules or route handlers.
- The app prefers native `fetch` in server components and route handlers. No `axios` is used.
- Security headers are set in `next.config.ts`, including `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, and a `Content-Security-Policy-Report-Only` baseline.
- External links that open a new tab use `rel="noreferrer noopener"`.
- The telemetry endpoint is server-side only, cached, and kept small.
- Dependencies are pinned through the lockfile and should stay committed.
- Use Dependabot and GitHub security alerts to catch dependency or advisory issues early.

When adding new environment variables, keep browser-exposed values limited to `NEXT_PUBLIC_` keys only when the client truly needs them.
