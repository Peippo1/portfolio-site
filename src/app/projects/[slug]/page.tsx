import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { getProjectBySlug, projects } from "@/data/projects";
import {
  formatRepositoryDate,
  getProjectGitHubMetadata,
} from "@/lib/github-metadata";

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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="border-l border-[var(--color-border)] pl-4">
          {item}
        </li>
      ))}
    </ul>
  );
}

const campaignForgeCaseStudy = {
  intro:
    "CampaignForge-AI is an AI-assisted campaign planning system for turning strategy into reviewable briefs, audience angles, and channel-ready outputs.",
  problem: [
    "Marketing teams often split planning, drafting, and channel adaptation across separate tools, which makes it hard to preserve campaign intent as work moves forward.",
    "The non-trivial part is not generation itself, but keeping strategy, copy, and delivery aligned while still letting people edit and review the work in a controlled flow.",
    "It is aimed at teams that need to move quickly without turning campaign work into a black-box prompt experiment.",
  ],
  approach: [
    "I modeled campaign inputs as structured strategy objects and used staged generation rather than a single prompt so each output could be checked independently.",
    "Human review sits between generation steps, which keeps the workflow legible and avoids pushing unverified copy straight into downstream channels.",
    "The system favors text-first interfaces and explicit output shapes because the product needs to support editing, not just generation.",
  ],
  stackGroups: [
    {
      label: "Frontend",
      items: ["Next.js", "Tailwind CSS"],
    },
    {
      label: "Backend",
      items: ["TypeScript", "PostgreSQL"],
    },
    {
      label: "AI",
      items: ["OpenAI"],
    },
  ],
  highlights: [
    "Modeled campaign inputs as reusable strategy objects instead of one-off prompts.",
    "Built staged generation flows with explicit human review points.",
    "Created output templates for email, paid social, and landing page copy.",
    "Kept the interface text-first so revision stays fast and predictable.",
  ],
  learned: [
    "The best output quality came from narrowing the system around a clear workflow, not from adding more generation depth.",
    "Keeping intermediate artifacts visible made the product easier to trust and easier to debug.",
    "Small structure decisions at the input layer had a bigger impact on product quality than prompt tweaks alone.",
  ],
};

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
  const repositoryMetadata = getProjectGitHubMetadata(slug);
  const isCampaignForge = slug === "campaignforge-ai";

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
              {isCampaignForge
                ? campaignForgeCaseStudy.intro
                : project.longSummary}
            </p>

            <p className="mt-6 text-xs leading-6 tracking-[0.14em] text-[var(--color-muted)] uppercase sm:text-[0.8rem]">
              {project.year} / {project.category} / {project.stack.join(" / ")}
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
              <p>{isCampaignForge ? campaignForgeCaseStudy.intro : project.longSummary}</p>
            </Section>

            <Section title="Problem">
              {isCampaignForge ? (
                <BulletList items={campaignForgeCaseStudy.problem} />
              ) : (
                <p>{project.problem}</p>
              )}
            </Section>

            <Section title="Approach">
              {isCampaignForge ? (
                <BulletList items={campaignForgeCaseStudy.approach} />
              ) : (
                <p>{project.solution}</p>
              )}
            </Section>

            <Section title="Stack">
              {isCampaignForge ? (
                <div className="grid gap-5 sm:grid-cols-3">
                  {campaignForgeCaseStudy.stackGroups.map((group) => (
                    <div key={group.label}>
                      <p className="text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase">
                        {group.label}
                      </p>
                      <p className="mt-2 text-[var(--color-text)]">
                        {group.items.join(" / ")}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs tracking-[0.14em] text-[var(--color-text)] uppercase sm:text-[0.8rem]">
                  {project.stack.join(" / ")}
                </p>
              )}
            </Section>

            <Section title="Highlights">
              <BulletList
                items={
                  isCampaignForge
                    ? campaignForgeCaseStudy.highlights
                    : project.highlights
                }
              />
            </Section>

            {isCampaignForge ? (
              <Section title="What I learned">
                <BulletList items={campaignForgeCaseStudy.learned} />
              </Section>
            ) : null}

            <Section title="Links">
              <div className="flex flex-col gap-2.5 text-[var(--color-text)]">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex w-fit items-center gap-2 rounded-full px-1 py-0.5 transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-muted)] focus-visible:bg-black/[0.03] focus-visible:outline-none"
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex w-fit items-center gap-2 rounded-full px-1 py-0.5 transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-muted)] focus-visible:bg-black/[0.03] focus-visible:outline-none"
                  >
                    Demo <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </Section>

            {repositoryMetadata ? (
              <section className="border-t border-[var(--color-border)] pt-7 sm:pt-8">
                <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                  Repository freshness
                </h2>
                <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
                  {repositoryMetadata.repoName ? (
                    <div>
                      <dt className="tracking-[0.16em] text-[var(--color-muted)] uppercase">
                        Repo
                      </dt>
                      <dd className="mt-2 text-[var(--color-text)]">
                        {repositoryMetadata.repoName}
                      </dd>
                    </div>
                  ) : null}
                  {repositoryMetadata.primaryLanguage ? (
                    <div>
                      <dt className="tracking-[0.16em] text-[var(--color-muted)] uppercase">
                        Language
                      </dt>
                      <dd className="mt-2 text-[var(--color-text)]">
                        {repositoryMetadata.primaryLanguage}
                      </dd>
                    </div>
                  ) : null}
                  {repositoryMetadata.lastUpdated ? (
                    <div>
                      <dt className="tracking-[0.16em] text-[var(--color-muted)] uppercase">
                        Updated
                      </dt>
                      <dd className="mt-2 text-[var(--color-text)]">
                        {formatRepositoryDate(repositoryMetadata.lastUpdated)}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </section>
            ) : null}
          </div>
        </article>
      </Container>
    </main>
  );
}
