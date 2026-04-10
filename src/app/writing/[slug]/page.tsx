import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { writingEntries } from "@/data/writing";

type WritingPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return writingEntries.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({
  params,
}: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = writingEntries.find((item) => item.slug === slug);

  if (!entry) {
    return {
      title: "Writing not found",
    };
  }

  return {
    title: entry.title,
    description: entry.summary,
  };
}

export default async function WritingDetailPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const entry = writingEntries.find((item) => item.slug === slug);

  if (!entry) {
    notFound();
  }

  return (
    <main>
      <Container className="max-w-4xl py-14 sm:py-16 lg:py-20">
        <div className="sticky top-[4.2rem] z-10 mb-8 w-fit rounded-full bg-[rgba(248,246,241,0.9)] px-2 py-1 backdrop-blur-sm">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 rounded-full px-1.5 py-0.5 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-text)] focus-visible:bg-black/[0.03] focus-visible:outline-none"
          >
            <span aria-hidden="true">←</span>
            Back to writing
          </Link>
        </div>

        <article className="mx-auto max-w-2xl">
          <header>
            <p className="text-sm tracking-[0.18em] text-[var(--color-muted)] uppercase">
              {entry.category}
            </p>

            <h1 className="font-editorial mt-5 text-4xl leading-tight sm:text-[3.1rem]">
              {entry.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--color-muted)]">
              <span>{entry.date}</span>
              <span>{entry.category}</span>
            </div>
          </header>

          <div className="mt-10 space-y-8 border-t border-[var(--color-border)] pt-7 sm:mt-12 sm:space-y-10 sm:pt-8">
            <section className="space-y-4">
              <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Summary
              </h2>
              <p className="text-[1rem] leading-8 text-[var(--color-muted)] sm:text-[1.03rem]">
                {entry.summary}
              </p>
            </section>

            <section className="space-y-4 border-t border-[var(--color-border)] pt-7 sm:pt-8">
              <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Note
              </h2>
              <p className="text-[1rem] leading-8 text-[var(--color-muted)] sm:text-[1.03rem]">
                This archive entry is intentionally brief. It captures the core
                idea in a compact form and leaves room for the note to expand
                later without changing the reading structure.
              </p>
            </section>
          </div>
        </article>
      </Container>
    </main>
  );
}
