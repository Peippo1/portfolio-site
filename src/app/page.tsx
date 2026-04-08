import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
import { getFeaturedProjects } from "@/data/projects";
import { writingEntries } from "@/data/writing";

const featuredProjects = getFeaturedProjects(3);
const latestWriting = writingEntries.slice(0, 2);

export default function HomePage() {
  return (
    <main>
      <Container className="py-20 sm:py-24">
        <PageIntro
          eyebrow="AI engineer and builder"
          title="Calm systems, careful interfaces, and practical work at the edge of research and product."
          description="I build applied AI products with a bias toward clear architecture, durable shipping, and restrained design. The work spans agents, developer tooling, evaluation systems, and small software businesses."
        />

        <section
          aria-labelledby="home-projects"
          className="mt-20 border-t border-[var(--color-border)] pt-8 sm:mt-24"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="home-projects"
              className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase"
            >
              Selected Projects
            </h2>
            <Link href="/projects" className="text-sm text-[var(--color-muted)]">
              View all
            </Link>
          </div>

          <div className="mt-6 divide-y divide-[var(--color-border)]">
            {featuredProjects.map((project) => (
              <article key={project.slug} className="py-6 sm:py-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                      {project.year} / {project.category}
                    </p>
                    <h3 className="mt-2 font-editorial text-2xl leading-tight sm:text-3xl">
                      <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                      {project.shortSummary}
                    </p>
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm text-[var(--color-muted)]"
                  >
                    Read case study
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-12 border-t border-[var(--color-border)] pt-8 sm:mt-24 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
          <div>
            <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
              Practice
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              My best work usually sits between product, infrastructure, and
              research translation: turning ambiguous model capability into
              something reliable enough for real teams to use every day.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
              Writing
            </h2>
            <div className="mt-4 divide-y divide-[var(--color-border)]">
              {latestWriting.map((entry) => (
                <article key={entry.slug} className="py-4">
                  <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                    {entry.date}
                  </p>
                  <h3 className="mt-2 text-lg leading-7">{entry.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                    {entry.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
