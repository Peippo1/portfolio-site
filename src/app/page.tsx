import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getFeaturedProjects } from "@/data/projects";
import { profile } from "@/data/profile";

const featuredProjects = getFeaturedProjects(3);

const recentFocus = [
  "LLM product workflows",
  "API design for internal tools",
  "Data products with clear operational surfaces",
];

export default function HomePage() {
  return (
    <main>
      <Container className="max-w-4xl py-20 sm:py-24">
        <header className="max-w-3xl">
          <p className="text-sm font-medium tracking-[0.2em] text-[var(--color-muted)] uppercase">
            {profile.name} / {profile.role}
          </p>

          <h1 className="font-editorial mt-6 text-4xl leading-tight sm:text-5xl">
            AI engineer building practical systems, APIs, data products, and
            experiments.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
            I design and ship focused software that helps teams work with
            models, move data cleanly, and keep the edge between research and
            production understandable.
          </p>
        </header>

        <section
          aria-labelledby="featured-projects"
          className="mt-18 border-t border-[var(--color-border)] pt-8 sm:mt-20"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="featured-projects"
              className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase"
            >
              Selected Projects
            </h2>
            <Link href="/projects" className="text-sm text-[var(--color-muted)]">
              View all projects
            </Link>
          </div>

          <div className="mt-6 divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
            {featuredProjects.map((project) => (
              <article key={project.slug} className="group py-6 sm:py-7">
                <Link
                  href={`/projects/${project.slug}`}
                  className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-editorial text-2xl leading-tight sm:text-[1.9rem]">
                        {project.title}
                      </h3>
                      <span className="text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase">
                        {project.year}
                      </span>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-[0.98rem]">
                      {project.shortSummary}
                    </p>
                    <p className="mt-3 text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase">
                      {project.stack.join(" / ")}
                    </p>
                  </div>

                  <div className="flex items-start sm:justify-end">
                    <span className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--color-text)]">
                      Case study <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-[var(--color-border)] pt-8 sm:mt-24">
          <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
            Currently building
          </h2>
          <div className="mt-4 grid gap-4 text-sm leading-7 text-[var(--color-muted)] sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <p className="max-w-2xl">
              I’m focused on the shape of AI products that need to stay useful
              after the novelty wears off: clean interfaces, explicit
              evaluation, and systems that are easy to reason about.
            </p>
            <ul className="space-y-2">
              {recentFocus.map((item) => (
                <li key={item} className="border-l border-[var(--color-border)] pl-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Container>
    </main>
  );
}
