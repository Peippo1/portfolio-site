import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata = {
  title: "Dev Portfolio",
  description: "AI engineer portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}