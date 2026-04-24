import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import {
  getHoxaSeriesEntries,
  getStandaloneArchiveEntries,
} from "@/data/writing";
import type { WritingEntry } from "@/types/content";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on applied AI, product engineering, interfaces, and the craft of making complex systems feel legible.",
};

function WritingFeed({
  entries,
  variant,
}: {
  entries: WritingEntry[];
  variant: "series" | "archive";
}) {
  return (
    <div className="border-y border-[var(--color-border)]">
      {entries.map((entry, index) => (
        <article
          key={entry.slug}
          className={
            index === entries.length - 1
              ? ""
              : "border-b border-[var(--color-border)]"
          }
        >
          <Link
            href={`/writing/${entry.slug}`}
            className="group grid gap-4 py-6 transition-colors duration-150 hover:bg-black/[0.012] focus-visible:bg-black/[0.02] focus-visible:outline-none sm:grid-cols-[11rem_minmax(0,1fr)_auto] sm:gap-6 sm:px-1 sm:py-7"
            aria-label={`Read ${entry.title}`}
          >
            <div className="space-y-2">
              <p className="text-sm tracking-[0.14em] text-[var(--color-muted)] uppercase">
                {variant === "series" && entry.series
                  ? `Part ${entry.series.order}`
                  : entry.date}
              </p>
              <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                {variant === "series" && entry.series
                  ? entry.date
                  : entry.category}
              </p>
            </div>
            <div className="min-w-0">
              <h2 className="font-editorial text-[1.5rem] leading-tight transition-colors duration-150 group-hover:text-[var(--color-text)] sm:text-[1.82rem]">
                {entry.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base sm:leading-8">
                {entry.summary}
              </p>
            </div>
            <div className="flex items-start justify-between gap-3 sm:justify-end">
              {entry.readingTime ? (
                <span className="text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase">
                  {entry.readingTime}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--color-text)]">
                Read <span aria-hidden="true">↗</span>
              </span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

export default function WritingPage() {
  const hoxaSeriesEntries = getHoxaSeriesEntries();
  const archiveEntries = getStandaloneArchiveEntries();
  const hoxaSeries = hoxaSeriesEntries[0]?.series;

  return (
    <main>
      <Container className="py-16 sm:py-20 lg:py-24">
        <PageIntro
          eyebrow="Writing"
          title="Product notes, systems thinking, and the working record behind what gets built."
          description="A restrained archive of writing on product engineering, interfaces, and applied AI, alongside an in-progress build thread for Hoxa."
        />

        {hoxaSeries ? (
          <section className="mt-14 border-y border-[var(--color-border)] py-8 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:gap-12">
              <div className="max-w-xl">
                <p className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                  Featured Series
                </p>
                <h2 className="font-editorial mt-4 text-[2rem] leading-tight sm:text-[2.35rem]">
                  {hoxaSeries.name}
                </h2>
                <p className="mt-4 text-[1rem] leading-8 text-[var(--color-muted)] sm:text-[1.04rem]">
                  {hoxaSeries.description}
                </p>
                <p className="mt-5 text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                  Seven posts / Product, design, architecture, and process
                </p>
              </div>

              <ol className="border-t border-[var(--color-border)] lg:border-t-0 lg:border-l lg:pl-10">
                {hoxaSeriesEntries.map((entry, index) => (
                  <li
                    key={entry.slug}
                    className={
                      index === 0
                        ? "pt-5 pb-5 lg:pt-0"
                        : "border-t border-[var(--color-border)] py-5"
                    }
                  >
                    <Link
                      href={`/writing/${entry.slug}`}
                      className="group block rounded-sm focus-visible:bg-black/[0.02] focus-visible:outline-none"
                    >
                      <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                        Part {entry.series?.order} / {entry.date}
                      </p>
                      <h3 className="font-editorial mt-3 text-[1.4rem] leading-tight transition-colors duration-150 group-hover:text-[var(--color-text)] sm:text-[1.6rem]">
                        {entry.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-[0.98rem] sm:leading-8">
                        {entry.summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        <section className="mt-14">
          <div className="max-w-3xl">
            <p className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
              Archive
            </p>
            <h2 className="font-editorial mt-4 text-[1.85rem] leading-tight sm:text-[2.15rem]">
              Standalone notes on systems, interfaces, and applied AI.
            </h2>
          </div>

          <div className="mt-8">
            <WritingFeed entries={archiveEntries} variant="archive" />
          </div>
        </section>
      </Container>
    </main>
  );
}
