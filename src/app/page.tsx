import Link from "next/link";
import { LiveTelemetry } from "@/components/home/live-telemetry";
import { Container } from "@/components/ui/container";
import { Surface } from "@/components/ui/surface";
import { getFeaturedProjects } from "@/data/projects";
import { profile } from "@/data/profile";
import { cityScoutSummary } from "@/data/writing";

const featuredProjects = getFeaturedProjects(3);

const recentFocus = [
  "Structured campaign workflows",
  "Reviewable telemetry with fallback feeds",
  "Reply systems with clear contracts",
];

export default function HomePage() {
  return (
    <main>
      <Container className="max-w-5xl py-14 sm:py-20 lg:py-24">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-start">
          <header className="max-w-3xl">
            <p className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
              {profile.name} / London / {profile.role}
            </p>

            <h1 className="font-editorial mt-5 max-w-2xl text-4xl leading-tight sm:text-5xl lg:text-[4.2rem]">
              Practical AI systems for real workflows.
            </h1>

            <p className="mt-5 max-w-2xl text-[1.04rem] leading-8 text-[var(--color-muted)] sm:text-[1.1rem]">
              I design software that connects models, data, and the workflows
              around them.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.35)] px-4 py-2 text-sm text-[var(--color-text)] transition-colors duration-150 hover:bg-white/60 focus-visible:bg-white/60 focus-visible:outline-none"
              >
                Selected work
              </Link>
              <Link
                href="/writing"
                className="inline-flex rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-text)] focus-visible:bg-black/[0.03] focus-visible:text-[var(--color-text)] focus-visible:outline-none"
              >
                Build threads
              </Link>
              <Link
                href="/about"
                className="inline-flex rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-text)] focus-visible:bg-black/[0.03] focus-visible:text-[var(--color-text)] focus-visible:outline-none"
              >
                About
              </Link>
            </div>
          </header>

          <Surface className="p-6 sm:p-7">
            <div className="space-y-6">
              <div>
                <p className="text-xs tracking-[0.18em] text-[var(--color-muted)] uppercase">
                  Current build
                </p>
                <p className="font-editorial mt-3 text-[1.35rem] leading-tight text-[var(--color-text)] sm:text-[1.55rem]">
                  CityScout
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {cityScoutSummary.oneLine}
                </p>
              </div>

              <div className="border-t border-[var(--color-border)] pt-5">
                <p className="text-xs tracking-[0.18em] text-[var(--color-muted)] uppercase">
                  Approach
                </p>
                <ul className="mt-3 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                  {profile.principles.slice(0, 3).map((principle) => (
                    <li key={principle} className="border-l border-[var(--color-border)] pl-4">
                      {principle}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Surface>
        </section>

        <LiveTelemetry />

        <section
          aria-labelledby="featured-projects"
          className="mt-16 border-t border-[var(--color-border)] pt-7 sm:mt-20 sm:pt-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2
                id="featured-projects"
                className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase"
              >
                Selected Projects
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                A small set of recent work, chosen for clarity, leverage, and
                practical use.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex w-fit rounded-full border border-[var(--color-border)] px-3.5 py-1.5 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-text)] focus-visible:bg-black/[0.03] focus-visible:text-[var(--color-text)] focus-visible:outline-none"
            >
              View all projects
            </Link>
          </div>

          <div className="mt-6 divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
            {featuredProjects.map((project) => (
              <article key={project.slug} className="group py-5 sm:py-6">
                <Link
                  href={`/projects/${project.slug}`}
                  className="grid gap-4 rounded-[1.25rem] px-1 py-2 transition-colors duration-150 hover:bg-black/[0.015] focus-visible:bg-black/[0.02] focus-visible:outline-none sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6 sm:px-3 sm:py-3"
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
          <div className="mt-4 grid gap-6 text-sm leading-7 text-[var(--color-muted)] sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <p className="max-w-2xl">{cityScoutSummary.readerFacing}</p>
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
