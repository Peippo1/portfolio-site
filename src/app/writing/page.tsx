import type { Metadata } from "next";
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
          title="Notes on evaluation, interface design, systems thinking, and building with models."
          description="A small archive of essays and working notes. For now these are local entries, presented as a simple index rather than a full publishing system."
        />

        <section className="mt-14 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {writingEntries.map((entry) => (
            <article key={entry.slug} className="py-6 sm:py-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                    {entry.date} / {entry.category}
                  </p>
                  <h2 className="font-editorial mt-2.5 text-[1.55rem] leading-tight sm:text-[1.75rem]">
                    {entry.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                    {entry.summary}
                  </p>
                </div>
                <span className="text-sm text-[var(--color-muted)]">
                  Coming soon
                </span>
              </div>
            </article>
          ))}
        </section>
      </Container>
    </main>
  );
}
