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
    <section className="border-t border-[var(--color-border)] pt-8 sm:pt-10">
      <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
        {title}
      </h2>
      <div className="mt-5 text-base leading-8 text-[var(--color-muted)] sm:text-[1.02rem]">
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
      <Container className="max-w-4xl py-14 sm:py-18">
        <div className="sticky top-[4.6rem] z-10 -mx-2 mb-10 w-fit rounded-full bg-[rgba(247,245,240,0.9)] px-2 py-1 backdrop-blur-sm">
          <Link
            href="/projects"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)]"
          >
            ← Back to projects
          </Link>
        </div>

        <article className="mx-auto max-w-2xl">
          <header>
            <p className="text-sm tracking-[0.18em] text-[var(--color-muted)] uppercase">
              {project.category}
            </p>

            <h1 className="font-editorial mt-5 text-4xl leading-tight sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">
              {project.shortSummary}
            </p>

            <dl className="mt-8 grid grid-cols-1 gap-y-4 border-t border-b border-[var(--color-border)] py-5 text-sm sm:grid-cols-3 sm:gap-x-6">
              <div>
                <dt className="tracking-[0.16em] text-[var(--color-muted)] uppercase">
                  Category
                </dt>
                <dd className="mt-2 text-[var(--color-text)]">{project.category}</dd>
              </div>
              <div>
                <dt className="tracking-[0.16em] text-[var(--color-muted)] uppercase">
                  Year
                </dt>
                <dd className="mt-2 text-[var(--color-text)]">{project.year}</dd>
              </div>
              <div>
                <dt className="tracking-[0.16em] text-[var(--color-muted)] uppercase">
                  Status
                </dt>
                <dd className="mt-2 text-[var(--color-text)]">{project.status}</dd>
              </div>
            </dl>
          </header>

          <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
            <Section title="Overview">
              <p>{project.longSummary}</p>
            </Section>

            <Section title="Problem">
              <p>{project.problem}</p>
            </Section>

            <Section title="Solution">
              <p>{project.solution}</p>
            </Section>

            <Section title="Stack">
              <p className="text-sm tracking-[0.14em] uppercase sm:text-[0.82rem]">
                {project.stack.join(" / ")}
              </p>
            </Section>

            <Section title="Key highlights">
              <ul className="space-y-4">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="border-l border-[var(--color-border)] pl-4">
                    {highlight}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Links">
              <div className="flex flex-col gap-3 text-[var(--color-text)]">
                <a
                  href={project.githubUrl}
                  className="inline-flex w-fit items-center gap-2"
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    className="inline-flex w-fit items-center gap-2"
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
