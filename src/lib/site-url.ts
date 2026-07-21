export function getSiteUrl(): URL {
  const defaultPublicSiteUrl = "https://tfinch.dev";
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (process.env.VERCEL_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
    return new URL(defaultPublicSiteUrl);
  }
  if (!configured) return new URL("http://localhost:3000");
  return new URL(configured.startsWith("http") ? configured : `https://${configured}`);
}
