import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentImage } from "@/components/content/content-image";
import { Container } from "@/components/ui/container";
import { getProjectBySlug, projects } from "@/data/projects";
import {
  formatRepositoryDate,
  getProjectGitHubMetadata,
} from "@/lib/github-metadata";
import type { WritingSectionBlock } from "@/types/content";

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

function DetailBlock({ block }: { block: WritingSectionBlock }) {
  if (block.type === "paragraph") return <p>{block.content}</p>;
  if (block.type === "list") return <BulletList items={block.items} />;
  if (block.type === "quote") {
    return (
      <figure className="border-l border-[var(--color-border)] pl-5">
        <blockquote className="font-editorial text-[1.4rem] leading-[1.5] text-[var(--color-text)]">
          {block.content}
        </blockquote>
        {block.attribution ? <figcaption className="mt-3 text-xs uppercase">{block.attribution}</figcaption> : null}
      </figure>
    );
  }
  if (block.type === "links") {
    return (
      <div className="flex flex-col gap-2.5 text-[var(--color-text)]">
        {block.items.map((item) =>
          isExternalUrl(item.href) ? (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer noopener" className="w-fit hover:text-[var(--color-muted)] focus-visible:outline-none">
              {item.label} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <Link key={item.href} href={item.href} className="w-fit hover:text-[var(--color-muted)] focus-visible:outline-none">
              {item.label} <span aria-hidden="true">→</span>
            </Link>
          )
        )}
      </div>
    );
  }
  if (block.type === "image") return <ContentImage block={block} />;
  return (
    <figure className="space-y-3">
      <pre className="overflow-x-auto rounded-[1.125rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5 font-mono text-[0.84rem] leading-[1.75] text-[var(--color-text)] shadow-[var(--shadow-soft)]">
        <code className="whitespace-pre-wrap break-words">{block.content}</code>
      </pre>
      {block.caption ? <figcaption className="text-xs tracking-[0.14em] uppercase">{block.caption}</figcaption> : null}
    </figure>
  );
}

function isExternalUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

function sectionLabel(title: string) {
  const labels: Record<string, string> = {
    Intro: "Overview",
    Problem: "Why it exists",
    Approach: "How it works",
    Stack: "Built with",
    Highlights: "What I focused on",
    "What I learned": "What I learned",
    Links: "Where to look",
  };

  return labels[title] ?? title;
}

const campaignForgeCaseStudy = {
  intro:
    "An end-to-end AI pipeline that generates marketing strategy, copy, and creative concepts from a single brief.",
  problem: [
    "Marketing teams often work across fragmented tools and workflows, which makes strategy, copywriting, and creative direction slow and inconsistent.",
    "The challenge is not only generating outputs, but keeping them structured, controllable, and usable in practice.",
  ],
  approach: [
    "CampaignForge uses a structured, multi-stage pipeline that transforms one brief into a complete set of campaign outputs.",
    "Rather than relying on isolated prompts, the system enforces a defined flow from brief to strategy to copy to creative concepts to review and export.",
    "Each stage builds on the previous one, which keeps the workflow consistent and easier to control.",
  ],
  stackGroups: [
    {
      label: "Backend",
      items: ["FastAPI"],
    },
    {
      label: "AI",
      items: ["Gemini", "OpenAI-compatible"],
    },
    {
      label: "Frontend",
      items: ["Streamlit"],
    },
    {
      label: "Data",
      items: ["Structured JSON outputs"],
    },
    {
      label: "Deployment",
      items: ["Containerised"],
    },
  ],
  highlights: [
    "Designed a multi-stage AI pipeline with enforced structure across outputs.",
    "Reduced reliance on ad-hoc prompting by making the workflow stages explicit.",
    "Built an API-first system that can integrate with other tools and workflows.",
    "Produced outputs that are structured, consistent, and ready for downstream use.",
  ],
  learned: [
    "Structure matters more than prompt quality when building multi-step AI systems.",
    "Constraining outputs improves usability and reduces downstream friction.",
    "Designing for real workflows requires thinking beyond individual model calls.",
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
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — Tim Finch`,
      description: project.shortSummary,
      url: `/projects/${project.slug}`,
      type: "article",
      images: [{ url: `/projects/${project.slug}/opengraph-image`, width: 1200, height: 630, alt: `${project.title} project case study` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Tim Finch`,
      description: project.shortSummary,
      images: [`/projects/${project.slug}/opengraph-image`],
    },
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
      <Container className="max-w-4xl py-14 sm:py-16 lg:py-20">
        <div className="sticky top-[4.2rem] z-10 mb-8 w-fit rounded-full bg-[rgba(248,246,241,0.9)] px-2 py-1 backdrop-blur-sm">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full px-1.5 py-0.5 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-text)] focus-visible:bg-black/[0.03] focus-visible:outline-none"
          >
            <span aria-hidden="true">←</span>
            Back to work
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
              {isCampaignForge ? campaignForgeCaseStudy.intro : project.shortSummary}
            </p>

            <p className="mt-6 text-xs leading-6 tracking-[0.14em] text-[var(--color-muted)] uppercase sm:text-[0.8rem]">
              {project.year} / {project.category} / {project.stack.join(" / ")}
            </p>

            <div className="mt-7 rounded-[1.4rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(16,17,20,0.02),rgba(16,17,20,0.008))] px-5 py-4">
              <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                Quick read
              </p>
              <p className="mt-2 text-[1rem] leading-7 text-[var(--color-text)]">
                A clear breakdown of the product, the reasoning behind it, and
                the implementation choices that matter.
              </p>
            </div>

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
            <Section title={sectionLabel("Intro")}>
              <p>{project.longSummary}</p>
            </Section>

            <Section title={sectionLabel("Problem")}>
              {isCampaignForge ? (
                <BulletList items={campaignForgeCaseStudy.problem} />
              ) : (
                <p>{project.problem}</p>
              )}
            </Section>

            <Section title={sectionLabel("Approach")}>
              {isCampaignForge ? (
                <BulletList items={campaignForgeCaseStudy.approach} />
              ) : (
                <p>{project.solution}</p>
              )}
            </Section>

            <Section title={sectionLabel("Stack")}>
              {isCampaignForge ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

            <Section title={sectionLabel("Highlights")}>
              <BulletList
                items={
                  isCampaignForge
                    ? campaignForgeCaseStudy.highlights
                    : project.highlights
                }
              />
            </Section>

            {project.details?.map((detail) => (
              <Section key={detail.title} title={detail.title}>
                <div className="space-y-5">
                  {detail.blocks.map((block, index) => (
                    <DetailBlock key={`${detail.title}-${index}`} block={block} />
                  ))}
                </div>
              </Section>
            ))}

            {isCampaignForge ? (
              <Section title={sectionLabel("What I learned")}>
                <BulletList items={campaignForgeCaseStudy.learned} />
              </Section>
            ) : null}

            <Section title={sectionLabel("Links")}>
              <div className="flex flex-col gap-2.5 text-[var(--color-text)]">
                {isExternalUrl(project.githubUrl) ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex w-fit items-center gap-2 rounded-full px-1 py-0.5 transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-muted)] focus-visible:bg-black/[0.03] focus-visible:outline-none"
                  >
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <div className="rounded-[1rem] border border-dashed border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-muted)]">
                    GitHub: {project.githubUrl}
                  </div>
                )}
                {project.demoUrl ? (
                  isExternalUrl(project.demoUrl) ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex w-fit items-center gap-2 rounded-full px-1 py-0.5 transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-muted)] focus-visible:bg-black/[0.03] focus-visible:outline-none"
                    >
                      Demo <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <div className="rounded-[1rem] border border-dashed border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-muted)]">
                      Demo: {project.demoUrl}
                    </div>
                  )
                ) : null}
              </div>
            </Section>

            {repositoryMetadata ? (
              <section className="border-t border-[var(--color-border)] pt-7 sm:pt-8">
                <h2 className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
                  Repository snapshot
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
