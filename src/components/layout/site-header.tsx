"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { IconMark } from "@/components/ui/icon-mark";

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
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[rgba(255,255,255,0.86)] backdrop-blur-xl">
      <Container className="flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-5">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 rounded-full px-1 py-1 transition-colors duration-150 hover:text-[var(--color-text)] focus-visible:bg-black/[0.03] focus-visible:outline-none sm:gap-3"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white shadow-[var(--shadow-soft)]">
            <IconMark className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold tracking-[0.14em] uppercase">
              Tim Finch
            </span>
            <span className="mt-0.5 hidden text-[11px] leading-5 tracking-[0.1em] text-[var(--color-muted)] uppercase sm:block">
              Products, systems, AI
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="flex w-full flex-wrap items-center justify-start gap-1 sm:w-auto sm:justify-end sm:gap-2"
        >
          {navigation.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-2 py-1.5 text-xs tracking-[0.01em] whitespace-nowrap focus-visible:bg-black/[0.03] focus-visible:outline-none sm:px-2.5 sm:text-sm ${
                  active
                    ? "bg-[var(--color-text)] !text-white shadow-[var(--shadow-soft)]"
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
