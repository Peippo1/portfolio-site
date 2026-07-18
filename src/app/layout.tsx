import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Tim Finch",
    template: "%s | Tim Finch",
  },
  description:
    "Tim Finch builds evidence-backed AI products, coding-agent infrastructure, and durable software systems.",
  keywords: ["AI engineering", "coding agents", "Nereid", "evaluation", "product engineering"],
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
