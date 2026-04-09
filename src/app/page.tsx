import Link from "next/link";
import { LiveTelemetry } from "@/components/home/live-telemetry";
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
      <Container className="max-w-4xl py-16 sm:py-20 lg:py-24">
        <header className="max-w-3xl">
          <p className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
            {profile.name} / London / {profile.role}
          </p>

          <h1 className="font-editorial mt-5 max-w-2xl text-4xl leading-tight sm:text-5xl">
            Practical AI systems for products, data, APIs, and experiments.
          </h1>

          <p className="mt-5 max-w-2xl text-[1.02rem] leading-8 text-[var(--color-muted)] sm:text-[1.08rem]">
            I design and ship software that helps teams work with models, move data cleanly, and keep complex systems reliable in production.
          </p>
        </header>

        <LiveTelemetry />

        <section
          aria-labelledby="featured-projects"
          className="mt-14 border-t border-[var(--color-border)] pt-7 sm:mt-16 sm:pt-8"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="featured-projects"
              className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase"
            >
              Selected Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] focus-visible:bg-black/[0.03] focus-visible:outline-none"
            >
              View all projects
            </Link>
          </div>

          <div className="mt-5 divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
            {featuredProjects.map((project) => (
              <article key={project.slug} className="group py-5 sm:py-6">
                <Link
                  href={`/projects/${project.slug}`}
                  className="grid gap-3 rounded-[1rem] px-1 py-1 transition-colors duration-150 hover:bg-black/[0.015] focus-visible:bg-black/[0.02] focus-visible:outline-none sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6 sm:px-2 sm:py-2"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-editorial text-[1.72rem] leading-tight transition-colors duration-150 group-hover:text-[var(--color-text)] sm:text-[1.95rem]">
                        {project.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase">
                      {project.year} / {project.status}
                    </p>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-[0.98rem]">
                      {project.shortSummary}
                    </p>
                    <p className="mt-3 text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase">
                      {project.stack.join(" / ")}
                    </p>
                  </div>

                  <div className="flex items-start sm:justify-end">
                    <span className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--color-text)]">
                      Open case study <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-[var(--color-border)] pt-7 sm:mt-20 sm:pt-8">
          <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
            Currently building
          </h2>
          <div className="mt-4 grid gap-6 text-sm leading-7 text-[var(--color-muted)] sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <p className="max-w-2xl">
              I’m focused on the shape of AI products that need to stay useful
              after the novelty wears off: clean interfaces, explicit
              evaluation, and systems that are easy to reason about.
            </p>
            <ul className="space-y-2.5">
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
