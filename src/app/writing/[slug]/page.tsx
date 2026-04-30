import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import {
  getOrderedWritingEntries,
  getWritingEntryBySlug,
} from "@/data/writing";
import type { WritingBlock } from "@/types/content";

export const dynamicParams = false;

type WritingPageProps = {
  params: Promise<{ slug: string }>;
};

function renderBlock(block: WritingBlock, key: string) {
  if (block.type === "paragraph") {
    return (
      <p
        key={key}
        className="text-[1.02rem] leading-8 text-[var(--color-muted)] sm:text-[1.05rem] sm:leading-[2rem]"
      >
        {block.content}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul
        key={key}
        className="space-y-3 pl-5 text-[1.02rem] leading-8 text-[var(--color-muted)] marker:text-[var(--color-soft)] sm:text-[1.05rem] sm:leading-[2rem]"
      >
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "quote") {
    return (
      <figure
        key={key}
        className="border-l border-[var(--color-border)] pl-5 sm:pl-6"
      >
        <blockquote className="font-editorial text-[1.35rem] leading-[1.55] text-[var(--color-text)] sm:text-[1.6rem]">
          {block.content}
        </blockquote>
        {block.attribution ? (
          <figcaption className="mt-4 text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
            {block.attribution}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure key={key} className="space-y-3">
      <pre className="overflow-x-auto rounded-[1.125rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5 font-mono text-[0.89rem] leading-[1.75] text-[var(--color-text)] shadow-[var(--shadow-soft)] sm:px-6">
        <code className="whitespace-pre-wrap break-words">{block.content}</code>
      </pre>
      {block.caption ? (
        <figcaption className="text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function sectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateStaticParams() {
  return getOrderedWritingEntries().map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({
  params,
}: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWritingEntryBySlug(slug);

  if (!entry) {
    return {
      title: "Writing not found",
    };
  }

  return {
    title: entry.title,
    description: entry.intro ?? entry.summary,
  };
}

export default async function WritingDetailPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const entry = getWritingEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const seriesSlug = entry.series?.slug;
  const seriesEntries = seriesSlug
    ? getOrderedWritingEntries().filter(
        (candidate) => candidate.series?.slug === seriesSlug
      )
    : [];
  const previousEntry = entry.series?.previousSlug
    ? getWritingEntryBySlug(entry.series.previousSlug)
    : undefined;
  const nextEntry = entry.series?.nextSlug
    ? getWritingEntryBySlug(entry.series.nextSlug)
    : undefined;
  const seriesLabel =
    entry.series && seriesEntries.length > 0
      ? `${entry.series.name} / Part ${entry.series.order} of ${seriesEntries.length}`
      : undefined;
  const bodyLead = entry.intro ?? entry.summary;
  const sectionLinks =
    entry.sections?.map((section) => ({
      title: section.title,
      id: sectionId(section.title),
    })) ?? [];

  return (
    <main>
      <Container className="max-w-5xl py-12 sm:py-16 lg:py-20">
        <div className="mb-8 sm:mb-10">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:text-[var(--color-text)] focus-visible:outline-none"
          >
            <span aria-hidden="true">←</span>
            Back to writing
          </Link>
        </div>

        <article className="mx-auto max-w-[44rem]">
          <header className="space-y-5 pb-10 sm:pb-12">
            <div className="space-y-2">
              <p className="text-sm tracking-[0.18em] text-[var(--color-muted)] uppercase">
                {entry.category}
              </p>
              {seriesLabel ? (
                <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                  {seriesLabel}
                </p>
              ) : null}
            </div>

            <h1 className="font-editorial text-4xl leading-tight sm:text-[3.25rem]">
              {entry.title}
            </h1>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--color-muted)]">
              <span>{entry.date}</span>
              {entry.readingTime ? <span>{entry.readingTime}</span> : null}
            </div>

            <p className="max-w-3xl text-[1.08rem] leading-8 text-[var(--color-text)] sm:text-[1.14rem] sm:leading-[2.1rem]">
              {bodyLead}
            </p>
          </header>

          {sectionLinks.length > 0 ? (
            <section className="border-y border-[var(--color-border)] py-6 sm:py-7">
              <div className="grid gap-4 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10">
                <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                  Contents
                </p>
                <nav aria-label="On this page">
                  <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-[var(--color-muted)]">
                    {sectionLinks.map((section, index) => (
                      <li key={section.id} className="flex items-center gap-3">
                        <span className="text-xs tracking-[0.14em] text-[var(--color-soft)] uppercase">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <a
                          href={`#${section.id}`}
                          className="transition-colors duration-150 hover:text-[var(--color-text)] focus-visible:text-[var(--color-text)] focus-visible:outline-none"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </section>
          ) : null}

          {entry.pullQuote ? (
            <section className="border-y border-[var(--color-border)] py-8 sm:py-10">
              <figure className="space-y-4">
                <blockquote className="font-editorial text-[1.55rem] leading-[1.55] text-[var(--color-text)] sm:text-[1.9rem]">
                  {entry.pullQuote.quote}
                </blockquote>
                {entry.pullQuote.attribution ? (
                  <figcaption className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                    {entry.pullQuote.attribution}
                  </figcaption>
                ) : null}
              </figure>
            </section>
          ) : null}

          {entry.sections && entry.sections.length > 0 ? (
            <div className="space-y-12 py-10 sm:space-y-14 sm:py-12">
              {entry.sections.map((section) => (
                <section
                  key={section.title}
                  id={sectionId(section.title)}
                  className="scroll-mt-24 space-y-5"
                >
                  <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                    {section.title}
                  </h2>
                  <div className="space-y-5">
                    {section.blocks.map((block, index) =>
                      renderBlock(block, `${section.title}-${index}`)
                    )}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <section className="py-10 sm:py-12">
              <p className="text-[1.02rem] leading-8 text-[var(--color-muted)] sm:text-[1.05rem] sm:leading-[2rem]">
                This note remains a shorter archive entry. Its summary stands as
                the primary record for now.
              </p>
            </section>
          )}

          {entry.series ? (
            <nav
              aria-label="Series navigation"
              className="border-t border-[var(--color-border)] pt-8 sm:pt-10"
            >
              <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                {entry.series.name}
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  {previousEntry ? (
                    <Link
                      href={`/writing/${previousEntry.slug}`}
                      className="group block rounded-[1rem] border border-[var(--color-border)] bg-white/35 px-5 py-4 transition-colors duration-150 hover:bg-white/55 focus-visible:bg-white/55 focus-visible:outline-none"
                    >
                      <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                        Previous in thread
                      </p>
                      <p className="mt-2 text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase">
                        Part {entry.series.order - 1} of {seriesEntries.length}
                      </p>
                      <p className="font-editorial mt-2 text-[1.25rem] leading-tight text-[var(--color-text)] transition-colors duration-150 group-hover:text-[var(--color-text)]">
                        {previousEntry.title}
                      </p>
                    </Link>
                  ) : (
                    <div className="rounded-[1rem] border border-dashed border-[var(--color-border)] px-5 py-4 text-sm text-[var(--color-muted)]">
                      Start of series
                    </div>
                  )}
                </div>

                <div>
                  {nextEntry ? (
                    <Link
                      href={`/writing/${nextEntry.slug}`}
                      className="group block rounded-[1rem] border border-[var(--color-border)] bg-white/35 px-5 py-4 transition-colors duration-150 hover:bg-white/55 focus-visible:bg-white/55 focus-visible:outline-none"
                    >
                      <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                        Next in thread
                      </p>
                      <p className="mt-2 text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase">
                        Part {entry.series.order + 1} of {seriesEntries.length}
                      </p>
                      <p className="font-editorial mt-2 text-[1.25rem] leading-tight text-[var(--color-text)] transition-colors duration-150 group-hover:text-[var(--color-text)]">
                        {nextEntry.title}
                      </p>
                    </Link>
                  ) : (
                    <div className="rounded-[1rem] border border-dashed border-[var(--color-border)] px-5 py-4 text-sm text-[var(--color-muted)]">
                      End of series
                    </div>
                  )}
                </div>
              </div>
            </nav>
          ) : null}

        </article>
      </Container>
    </main>
  );
}
