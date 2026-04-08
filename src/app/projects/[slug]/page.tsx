import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[var(--color-border)] pt-7 sm:pt-8">
      <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
        {title}
      </h2>
      <div className="mt-4 text-[1rem] leading-8 text-[var(--color-muted)] sm:text-[1.03rem]">
        {children}
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.shortSummary,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <Container className="max-w-4xl py-14 sm:py-18 lg:py-20">
        <div className="sticky top-[4.2rem] z-10 mb-8 w-fit rounded-full bg-[rgba(248,246,241,0.9)] px-2 py-1 backdrop-blur-sm">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full px-1.5 py-0.5 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-text)] focus-visible:bg-black/[0.03] focus-visible:outline-none"
          >
            <span aria-hidden="true">←</span>
            Back to projects
          </Link>
        </div>

        <article className="mx-auto max-w-2xl">
          <header>
            <p className="text-sm tracking-[0.18em] text-[var(--color-muted)] uppercase">
              {project.category}
            </p>

            <h1 className="font-editorial mt-5 text-4xl leading-tight sm:text-[3.25rem]">
              {project.title}
            </h1>

            <p className="mt-4 text-[1.03rem] leading-8 text-[var(--color-muted)] sm:text-[1.08rem]">
              {project.shortSummary}
            </p>

            <dl className="mt-7 grid grid-cols-1 gap-y-4 border-t border-b border-[var(--color-border)] py-5 text-sm sm:grid-cols-3 sm:gap-x-6">
              <div>
                <dt className="tracking-[0.16em] text-[var(--color-muted)] uppercase">
                  Year
                </dt>
                <dd className="mt-2 text-[var(--color-text)]">{project.year}</dd>
              </div>
              <div>
                <dt className="tracking-[0.16em] text-[var(--color-muted)] uppercase">
                  Category
                </dt>
                <dd className="mt-2 text-[var(--color-text)]">{project.category}</dd>
              </div>
              <div>
                <dt className="tracking-[0.16em] text-[var(--color-muted)] uppercase">
                  Status
                </dt>
                <dd className="mt-2 text-[var(--color-text)]">{project.status}</dd>
              </div>
            </dl>
          </header>

          <div className="mt-9 space-y-9 sm:mt-10 sm:space-y-10">
            <Section title="Intro">
              <p>{project.longSummary}</p>
            </Section>

            <Section title="Problem">
              <p>{project.problem}</p>
            </Section>

            <Section title="Approach">
              <p>{project.solution}</p>
            </Section>

            <Section title="Stack">
              <p className="text-xs tracking-[0.14em] text-[var(--color-text)] uppercase sm:text-[0.8rem]">
                {project.stack.join(" / ")}
              </p>
            </Section>

            <Section title="Selected highlights">
              <ul className="space-y-4">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="border-l border-[var(--color-border)] pl-4">
                    {highlight}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Links">
              <div className="flex flex-col gap-2.5 text-[var(--color-text)]">
                <a
                  href={project.githubUrl}
                  className="inline-flex w-fit items-center gap-2 rounded-full px-1 py-0.5 transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-muted)] focus-visible:bg-black/[0.03] focus-visible:outline-none"
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    className="inline-flex w-fit items-center gap-2 rounded-full px-1 py-0.5 transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-muted)] focus-visible:bg-black/[0.03] focus-visible:outline-none"
                  >
                    Demo <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </Section>
          </div>
        </article>
      </Container>
    </main>
  );
}
