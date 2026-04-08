"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[rgba(248,246,241,0.84)] backdrop-blur-sm">
      <Container className="flex items-center justify-between gap-4 py-4 sm:gap-6 sm:py-5">
        <Link
          href="/"
          className="min-w-0 rounded-full px-0.5 py-0.5 transition-colors duration-150 hover:text-[var(--color-text)] focus-visible:bg-black/[0.03]"
        >
          <span className="block text-sm font-medium tracking-[0.18em] uppercase">
            Tim Finch
          </span>
          <span className="mt-1 block text-xs leading-5 text-[var(--color-muted)]">
            AI engineer, systems builder
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {navigation.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-2.5 py-1.5 text-sm tracking-[0.01em] focus-visible:bg-black/[0.03] ${
                  active
                    ? "bg-black/[0.04] text-[var(--color-text)] ring-1 ring-black/5"
                    : "text-[var(--color-muted)] hover:bg-black/[0.03] hover:text-[var(--color-text)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
