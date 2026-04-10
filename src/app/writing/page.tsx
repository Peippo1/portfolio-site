import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { writingEntries } from "@/data/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on applied AI, product engineering, interfaces, and the craft of making complex systems feel legible.",
};

export default function WritingPage() {
  return (
    <main>
      <Container className="py-16 sm:py-20 lg:py-24">
        <PageIntro
          eyebrow="Writing"
          title="A small archive of notes on AI products, interfaces, and systems work."
          description="Short notes and essays, presented as a clean index rather than a blog theme."
        />

        <section className="mt-14 border-y border-[var(--color-border)]">
          {writingEntries.map((entry) => (
            <article key={entry.slug} className="border-b border-[var(--color-border)]">
              <Link
                href={`/writing/${entry.slug}`}
                className="group grid gap-3 py-6 transition-colors duration-150 hover:bg-black/[0.012] focus-visible:bg-black/[0.02] focus-visible:outline-none sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:gap-6 sm:py-7 sm:px-1"
                aria-label={`Read ${entry.title}`}
              >
                <div className="space-y-2">
                  <p className="text-sm tracking-[0.14em] text-[var(--color-muted)] uppercase">
                    {entry.date}
                  </p>
                  <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                    {entry.category}
                  </p>
                </div>
                <div className="min-w-0">
                  <h2 className="font-editorial text-[1.5rem] leading-tight transition-colors duration-150 group-hover:text-[var(--color-text)] sm:text-[1.75rem]">
                    {entry.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                    {entry.summary}
                  </p>
                </div>
                <div className="flex items-start sm:justify-end">
                  <span className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--color-text)]">
                    Read article <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </Container>
    </main>
  );
}
