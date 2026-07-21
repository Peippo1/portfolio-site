import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-url";

const siteDescription =
  "Tim Finch builds evidence-backed AI products, coding-agent infrastructure, and durable software systems.";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Tim Finch",
    template: "%s | Tim Finch",
  },
  description: siteDescription,
  keywords: ["AI engineering", "coding agents", "Nereid", "evaluation", "product engineering"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tim Finch",
    description: siteDescription,
    url: "/",
    siteName: "Tim Finch",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tim Finch",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <div className="relative min-h-screen">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
