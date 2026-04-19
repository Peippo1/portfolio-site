import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tim Finch",
    template: "%s | Tim Finch",
  },
  description:
    "A minimal editorial portfolio for an AI engineer building durable systems, thoughtful tools, and applied research products.",
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
