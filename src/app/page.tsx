import Link from "next/link";
import { LiveTelemetry } from "@/components/home/live-telemetry";
import { Container } from "@/components/ui/container";
import { Surface } from "@/components/ui/surface";
import { getProjectBySlug } from "@/data/projects";
import { profile } from "@/data/profile";
import {
  campaignForgeSummary,
  cityScoutSummary,
  creatorOSSummary,
  evalkitSummary,
  hoxaSummary,
  getWritingEntryBySlug,
} from "@/data/writing";
import { IconMark } from "@/components/ui/icon-mark";

const featuredProjects = ["cutout-studio", "campaignforge-ai", "evalkit", "hoxa", "cityscout"]
  .map((slug) => getProjectBySlug(slug))
  .filter((project) => project !== undefined);

const activeBuildLinks = [
  {
    title: "Cutout Studio",
    oneLine:
      "A safer public beta for portrait background removal with verified login, moderation, and audit logging.",
    href: "/projects/cutout-studio",
  },
  {
    title: "CampaignForge AI",
    oneLine: campaignForgeSummary.oneLine,
    href: "/projects/campaignforge-ai",
  },
  { title: "EvalKit", oneLine: evalkitSummary.oneLine, href: "/projects/evalkit" },
  { title: "Hoxa", oneLine: hoxaSummary.oneLine, href: "/projects/hoxa" },
  { title: "CityScout", oneLine: cityScoutSummary.oneLine, href: "/projects/cityscout" },
  { title: "CreatorOS", oneLine: creatorOSSummary.oneLine, href: "/projects/creatoros" },
];

const cutoutStudioLaunchEntry = {
  slug: "cutout-studio-beta-launch",
  title: "Launching Cutout Studio as a Verified Beta",
  date: "July 12, 2026",
  category: "Product Launch",
  summary:
    "How a simple background-removal tool turned into a stricter public beta with verified login, moderation, abuse reporting, and no image retention by default.",
  readingTime: "7 min read",
};

const featuredWriting = [
  cutoutStudioLaunchEntry,
  getWritingEntryBySlug("building-a-reusable-pr-to-paper-trail-workflow"),
  getWritingEntryBySlug("introducing-campaignforge-ai"),
  getWritingEntryBySlug("choosing-the-right-commercial-path-for-campaignforge-ai"),
  getWritingEntryBySlug("what-campaignforge-ai-needs-before-hosted-deployment"),
  getWritingEntryBySlug("introducing-evalkit"),
].filter((entry) => entry !== undefined);

const workflowLinks = [
  {
    label: "Read the workflow article",
    href: "/writing/building-a-reusable-pr-to-paper-trail-workflow",
  },
  {
    label: "View the reusable skill",
    href: "https://github.com/Peippo1/pr-to-paper-trail/tree/main/skills/pr-to-paper-trail",
  },
  {
    label: "View the workflow package",
    href: "https://github.com/Peippo1/pr-to-paper-trail/tree/main/pr_to_paper_trail",
  },
];

const launchMetrics = [
  { label: "API requests (24h)", value: "2.41M", delta: "+23%" },
  { label: "Tasks completed", value: "18,732", delta: "+31%" },
  { label: "Success rate", value: "98.7%", delta: "+1.2%" },
  { label: "Users", value: "12,846", delta: "+17%" },
];

function ProductBoardPreview() {
  return (
    <Surface className="overflow-hidden rounded-[1.9rem] border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] shadow-[var(--shadow-card)]">
      <div className="grid min-h-[29rem] lg:grid-cols-[12rem_minmax(0,1fr)]">
        <div className="border-b border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(16,17,20,0.03),rgba(16,17,20,0.01))] p-5 lg:border-r lg:border-b-0">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-soft)]">
              <IconMark className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-semibold">EvalKit</span>
          </div>
          <div className="mt-5 space-y-2 text-sm text-[var(--color-muted)]">
            {["Suites", "Cases", "Checks", "Runs", "Billing"].map((item, index) => (
              <div
                key={item}
                className={`rounded-xl px-3 py-2 ${index === 0 ? "bg-[var(--color-text)] text-white" : "bg-black/[0.02]"}`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-5 p-5 sm:p-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--color-text)]">
                Deterministic eval pipeline
              </p>
              <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                Regression testing for structured AI outputs, safety checks, and
                capability drift.
              </p>
            </div>
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] px-3 py-1 text-xs tracking-[0.14em] text-[var(--color-accent)] uppercase">
              Live prototype
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Suites", value: "128" },
              { label: "Checks passed", value: "312" },
              { label: "Avg. runtime", value: "2.3m" },
            ].map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1.25rem] border border-[var(--color-border)] bg-black/[0.01] p-4"
              >
                <p className="text-[11px] tracking-[0.14em] text-[var(--color-muted)] uppercase">
                  {metric.label}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-[1.35rem] border border-[var(--color-border)]">
            <div className="flex flex-col items-start gap-1 border-b border-[var(--color-border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                Recent runs
              </p>
              <p className="text-xs tracking-[0.16em] text-[var(--color-accent)] uppercase">
                All systems operational
              </p>
            </div>
            <div className="divide-y divide-[var(--color-border)]">
              {[
                ["Schema drift guard", "12 checks", "Passed"],
                ["Unsafe claims filter", "8 checks", "Passed"],
                ["Capability retention", "17 checks", "Review"],
              ].map(([title, count, status]) => (
                <div key={title} className="grid gap-3 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center">
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text)]">{title}</p>
                    <p className="mt-1 text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase">
                      {count}
                    </p>
                  </div>
                  <div className="h-7 w-full max-w-[7rem] overflow-hidden rounded-full bg-[linear-gradient(90deg,rgba(15,138,100,0.14),rgba(16,17,20,0.03))]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-accent),rgba(15,138,100,0.45))]"
                      style={{ width: title === "Capability retention" ? "61%" : "88%" }}
                    />
                  </div>
                  <span
                    className={`text-xs tracking-[0.14em] uppercase ${
                      status === "Passed" ? "text-[var(--color-accent)]" : "text-[var(--color-text)]"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function ProjectPreview({ slug }: { slug: string }) {
  const previewBySlug: Record<string, React.ReactNode> = {
    "cutout-studio": (
      <div className="relative h-full overflow-hidden rounded-[1.3rem] bg-[radial-gradient(circle_at_18%_18%,rgba(248,190,110,0.32),transparent_22%),radial-gradient(circle_at_78%_24%,rgba(54,123,94,0.22),transparent_20%),linear-gradient(135deg,#f8f4ea,#e9efe9_56%,#ffffff)]">
        <div className="absolute inset-[8%] rounded-[1.15rem] border border-black/8 bg-white/70" />
        <div className="absolute left-[11%] top-[15%] h-[58%] w-[26%] rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(16,17,20,0.05),rgba(16,17,20,0.01))]" />
        <div className="absolute right-[11%] top-[16%] h-[22%] w-[34%] rounded-full bg-white/94 shadow-[0_18px_42px_rgba(54,123,94,0.08)]" />
        <div className="absolute right-[12%] bottom-[16%] h-[34%] w-[28%] rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(54,123,94,0.14),rgba(255,255,255,0.72))]" />
        <div className="absolute left-[43%] top-[39%] h-[8px] w-[28%] rounded-full bg-[rgba(54,123,94,0.58)]" />
        <div className="absolute left-[43%] top-[51%] h-[8px] w-[24%] rounded-full bg-black/[0.08]" />
        <div className="absolute left-[43%] top-[63%] h-[8px] w-[20%] rounded-full bg-black/[0.06]" />
      </div>
    ),
    hoxa: (
      <div className="relative h-full overflow-hidden rounded-[1.3rem] bg-[radial-gradient(circle_at_18%_18%,rgba(106,235,172,0.56),transparent_22%),radial-gradient(circle_at_80%_26%,rgba(106,235,172,0.22),transparent_24%),linear-gradient(135deg,#111413,#1d2522_58%,#28332f)]">
        <div className="absolute inset-[8%] rounded-[1.15rem] border border-white/10 bg-white/[0.03]" />
        <div className="absolute left-[12%] top-[16%] h-[62%] w-[54%] rounded-[1.7rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" />
        <div className="absolute right-[10%] top-[14%] h-[34%] w-[34%] rounded-full bg-[rgba(106,235,172,0.16)] blur-2xl" />
        <div className="absolute bottom-[12%] right-[12%] h-[40%] w-[22%] rounded-[1.5rem] border border-white/10 bg-white/[0.05]" />
        <div className="absolute bottom-[16%] left-[18%] h-[16%] w-[40%] rounded-full bg-[linear-gradient(90deg,rgba(106,235,172,0.34),rgba(255,255,255,0.04))]" />
      </div>
    ),
    cityscout: (
      <div className="relative h-full overflow-hidden rounded-[1.3rem] bg-[radial-gradient(circle_at_22%_24%,rgba(113,177,204,0.4),transparent_20%),radial-gradient(circle_at_80%_78%,rgba(113,177,204,0.16),transparent_24%),linear-gradient(135deg,#eef4f6,#dce8ed_52%,#f8fafb)]">
        <div className="absolute inset-[8%] rounded-[1.2rem] border border-black/8 bg-white/42" />
        <div className="absolute left-[12%] top-[16%] h-[60%] w-[44%] rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(194,219,229,0.52))]" />
        <div className="absolute right-[11%] top-[17%] h-[20%] w-[32%] rounded-full bg-white/92 shadow-[0_18px_42px_rgba(112,171,198,0.14)]" />
        <div className="absolute right-[13%] bottom-[15%] h-[34%] w-[24%] rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(194,219,229,0.36))]" />
        <div className="absolute bottom-[18%] left-[18%] h-[18%] w-[36%] rounded-full bg-[rgba(113,177,204,0.16)] blur-2xl" />
      </div>
    ),
    creatoros: (
      <div className="relative h-full overflow-hidden rounded-[1.3rem] bg-[radial-gradient(circle_at_78%_24%,rgba(148,136,219,0.22),transparent_20%),radial-gradient(circle_at_22%_78%,rgba(148,136,219,0.1),transparent_22%),linear-gradient(135deg,#f8f8fa,#eef0f5_50%,#ffffff)]">
        <div className="absolute inset-[8%] rounded-[1.15rem] border border-black/7 bg-white/78" />
        <div className="absolute left-[12%] top-[16%] h-[58%] w-[22%] rounded-[1.3rem] bg-[linear-gradient(180deg,rgba(16,17,20,0.05),rgba(16,17,20,0.01))]" />
        <div className="absolute right-[12%] top-[18%] h-[18%] w-[34%] rounded-full bg-[rgba(16,17,20,0.06)]" />
        <div className="absolute right-[12%] bottom-[14%] grid h-[34%] w-[38%] grid-cols-2 gap-3">
          <div className="rounded-[1rem] border border-black/6 bg-white/90" />
          <div className="rounded-[1rem] border border-black/6 bg-white/78" />
          <div className="rounded-[1rem] border border-black/6 bg-white/82" />
          <div className="rounded-[1rem] border border-black/6 bg-white/94" />
        </div>
        <div className="absolute left-[20%] bottom-[18%] h-[18%] w-[26%] rounded-full bg-[rgba(148,136,219,0.14)] blur-2xl" />
      </div>
    ),
    evalkit: (
      <div className="relative h-full overflow-hidden rounded-[1.3rem] bg-[radial-gradient(circle_at_20%_18%,rgba(15,138,100,0.28),transparent_18%),radial-gradient(circle_at_82%_76%,rgba(15,138,100,0.16),transparent_22%),linear-gradient(135deg,#f8fbf9,#edf5f2_44%,#ffffff)]">
        <div className="absolute inset-[8%] rounded-[1.15rem] border border-black/7 bg-white/78" />
        <div className="absolute left-[12%] top-[15%] h-[62%] w-[24%] rounded-[1.3rem] bg-[linear-gradient(180deg,rgba(16,17,20,0.05),rgba(16,17,20,0.015))]" />
        <div className="absolute right-[12%] top-[18%] h-[18%] w-[38%] rounded-full bg-white/94 shadow-[0_18px_42px_rgba(15,138,100,0.08)]" />
        <div className="absolute right-[12%] bottom-[15%] h-[38%] w-[30%] rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(15,138,100,0.12),rgba(255,255,255,0.72))]" />
        <div className="absolute left-[42%] top-[38%] h-[8px] w-[28%] rounded-full bg-[var(--color-accent)]/60" />
        <div className="absolute left-[42%] top-[50%] h-[8px] w-[22%] rounded-full bg-black/[0.08]" />
        <div className="absolute left-[42%] top-[62%] h-[8px] w-[18%] rounded-full bg-black/[0.06]" />
      </div>
    ),
  };

  return <>{previewBySlug[slug]}</>;
}

function WritingPreview({ variant }: { variant: "dark" | "diagram" | "landscape" | "launch" }) {
  if (variant === "launch") {
    return (
      <div className="relative h-full overflow-hidden rounded-[1.2rem] bg-[radial-gradient(circle_at_18%_18%,rgba(248,190,110,0.26),transparent_18%),radial-gradient(circle_at_78%_20%,rgba(54,123,94,0.2),transparent_18%),linear-gradient(135deg,#f8f4ea,#f0f4ef)]">
        <div className="absolute inset-[9%] rounded-[1rem] border border-black/8 bg-white/76" />
        <div className="absolute left-[12%] top-[16%] h-[18%] w-[42%] rounded-full bg-[rgba(54,123,94,0.1)]" />
        <div className="absolute left-[12%] top-[42%] h-[8px] w-[48%] rounded-full bg-[rgba(54,123,94,0.58)]" />
        <div className="absolute left-[12%] top-[54%] h-[8px] w-[36%] rounded-full bg-black/[0.08]" />
        <div className="absolute right-[12%] bottom-[14%] h-[34%] w-[24%] rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(54,123,94,0.12),rgba(255,255,255,0.72))]" />
      </div>
    );
  }

  if (variant === "dark") {
    return (
      <div className="relative h-full overflow-hidden rounded-[1.2rem] bg-[radial-gradient(circle_at_76%_20%,rgba(89,233,167,0.22),transparent_18%),linear-gradient(180deg,#111414,#1a201d)]">
        <div className="absolute inset-[8%] rounded-[1rem] border border-white/10" />
        <div className="absolute left-[10%] top-[16%] h-[22%] w-[28%] rounded-[1rem] border border-white/10 bg-white/[0.03]" />
        <div className="absolute right-[12%] top-[20%] h-[18%] w-[26%] rounded-full bg-white/[0.06]" />
        <div className="absolute bottom-[14%] left-[12%] h-[28%] w-[52%] rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(89,233,167,0.22),rgba(255,255,255,0.02))]" />
        <div className="absolute bottom-[14%] right-[12%] h-[44%] w-[16%] rounded-full bg-[rgba(89,233,167,0.18)] blur-xl" />
      </div>
    );
  }

  if (variant === "diagram") {
    return (
      <div className="relative flex h-full items-center justify-center rounded-[1.2rem] bg-[radial-gradient(circle_at_14%_18%,rgba(15,138,100,0.12),transparent_18%),linear-gradient(135deg,#fafaf9,#f1f4f2)] p-4">
        <div className="absolute inset-[9%] rounded-[1rem] border border-[rgba(15,138,100,0.12)] bg-white/68" />
        <div className="relative grid w-full grid-cols-4 gap-3 text-center text-[10px] tracking-[0.12em] text-[var(--color-muted)] uppercase">
          {["Inputs", "Outputs", "Scoring", "Report"].map((label) => (
            <div key={label} className="space-y-2">
              <div className="h-14 rounded-[0.9rem] border border-black/8 bg-[linear-gradient(180deg,rgba(16,17,20,0.02),rgba(16,17,20,0.006))]" />
              <div>{label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden rounded-[1.2rem] bg-[radial-gradient(circle_at_82%_22%,rgba(113,177,204,0.2),transparent_18%),linear-gradient(135deg,#e8edf0,#f9fafb)]">
      <div className="absolute inset-[10%] rounded-[1rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(168,181,194,0.18))]" />
      <div className="absolute left-[14%] top-[18%] h-[36%] w-[32%] rounded-full bg-white/70 blur-xl" />
      <div className="absolute inset-x-[16%] bottom-[16%] h-[28%] rounded-[1rem] bg-[linear-gradient(180deg,rgba(90,106,122,0.18),rgba(255,255,255,0.04))]" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main>
      <Container className="max-w-5xl py-14 sm:py-20 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(24rem,1.08fr)] lg:items-center">
          <header className="max-w-3xl">
            <h1 className="font-editorial max-w-2xl text-[2.55rem] leading-[0.96] sm:text-[4rem] lg:text-[5.15rem]">
              Practical AI systems for real workflows.
            </h1>

            <p className="mt-6 max-w-lg text-[1.02rem] leading-8 text-[var(--color-muted)] sm:text-[1.08rem]">
              I&apos;m {profile.name}, an AI engineer building product ideas into
              things people can actually use. Most of my work sits somewhere
              between AI systems, product thinking, and the messy operational
              work needed to make software hold up.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-text)] px-5 py-3 text-sm !text-white shadow-[var(--shadow-soft)] transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none"
              >
                Selected work
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/writing"
                className="inline-flex rounded-full border border-[var(--color-border-strong)] bg-white px-5 py-3 text-sm text-[var(--color-text)] transition-colors duration-150 hover:bg-black/[0.03] focus-visible:bg-black/[0.03] focus-visible:outline-none"
              >
                Read writing
              </Link>
              {profile.cvUrl ? (
                <a
                  href={profile.cvUrl}
                  className="inline-flex rounded-full border border-[var(--color-border-strong)] bg-white px-5 py-3 text-sm text-[var(--color-text)] transition-colors duration-150 hover:bg-black/[0.03] focus-visible:bg-black/[0.03] focus-visible:outline-none"
                >
                  View CV
                </a>
              ) : null}
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {profile.principles.slice(0, 4).map((principle) => (
                <div key={principle} className="rounded-[1.35rem] border border-[var(--color-border)] bg-white px-4 py-4 shadow-[var(--shadow-soft)]">
                  <p className="text-sm leading-7 text-[var(--color-muted)]">{principle}</p>
                </div>
              ))}
            </div>
          </header>

          <ProductBoardPreview />
        </section>

        <section
          aria-labelledby="featured-projects"
          className="mt-20 border-t border-[var(--color-border)] pt-10 sm:mt-24 sm:pt-12"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Featured projects
              </p>
              <h2
                id="featured-projects"
                className="font-editorial mt-3 text-[2.15rem] leading-tight sm:text-[2.7rem]"
              >
                Products I&apos;m building.
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:text-[var(--color-text)]"
            >
              View all projects <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-10 flex snap-x gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:gap-7 lg:overflow-visible">
            {featuredProjects.map((project) => (
              <article key={project.slug} className="group min-w-[20.5rem] snap-start lg:min-w-0">
                <Link
                  href={`/projects/${project.slug}`}
                  className="block overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] focus-visible:outline-none"
                >
                  <div className="aspect-[1.22/0.82] border-b border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(16,17,20,0.02),rgba(16,17,20,0.006))] p-4">
                    <ProjectPreview slug={project.slug} />
                  </div>
                  <div className="p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-editorial text-[1.45rem] leading-tight transition-colors duration-150 group-hover:text-[var(--color-text)]">
                        {project.title}
                      </h3>
                      <span className="text-[11px] tracking-[0.14em] text-[var(--color-muted)] uppercase">
                        {project.year}
                      </span>
                    </div>
                    <p className="mt-3 max-w-md text-sm leading-7 text-[var(--color-muted)]">
                      {project.shortSummary}
                    </p>
                    <p className="mt-4 text-[11px] tracking-[0.14em] text-[var(--color-muted)] uppercase">
                      {project.stack.join(" / ")}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--color-text)]">
                      Open project <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] border border-[var(--color-border)] bg-white px-5 py-6 shadow-[var(--shadow-soft)] sm:mt-24 sm:px-6 sm:py-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Systems in motion
              </p>
              <h2 className="font-editorial mt-3 text-[2rem] leading-tight sm:text-[2.35rem]">
                Live usage across products and agents.
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                Built for reliability, measured every day.
              </p>
            </div>
            <Link
              href="#live-telemetry"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:text-[var(--color-text)]"
            >
              See project telemetry <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
            {launchMetrics.map((metric) => (
              <div
                key={metric.label}
                className="min-w-[15rem] snap-start rounded-[1.35rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(16,17,20,0.018),rgba(16,17,20,0.008))] p-4 lg:min-w-0"
              >
                <p className="text-[11px] tracking-[0.14em] text-[var(--color-muted)] uppercase">
                  {metric.label}
                </p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-[1.9rem] font-semibold tracking-[-0.04em] text-[var(--color-text)]">
                    {metric.value}
                  </p>
                  <span className="text-[11px] tracking-[0.14em] text-[var(--color-accent)] uppercase">
                    {metric.delta}
                  </span>
                </div>
                <div className="mt-4 flex h-8 items-end gap-1.5">
                  {[35, 44, 28, 52, 46, 61, 49, 67].map((value, index) => (
                    <div
                      key={index}
                      className="w-full rounded-t-full bg-[linear-gradient(180deg,rgba(15,138,100,0.72),rgba(15,138,100,0.15))]"
                      style={{ height: `${value}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <LiveTelemetry />

        <section className="mt-20 border-t border-[var(--color-border)] pt-10 sm:mt-24 sm:pt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Featured writing
              </p>
              <h2 className="font-editorial mt-3 text-[2.05rem] leading-tight sm:text-[2.55rem]">
                Articles, build threads, and workflow notes.
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                Writing about what I&apos;m building, what is changing, and where
                the thinking is still getting worked out, including Cutout
                Studio, PR-to-Paper-Trail, and the CampaignForge AI product
                work.
              </p>
            </div>
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:text-[var(--color-text)]"
            >
              Explore all writing <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-10 flex snap-x gap-6 overflow-x-auto pb-2">
            {featuredWriting.map((entry, index) => (
              <article key={entry.slug} className="min-w-[20rem] snap-start md:min-w-[24rem] lg:min-w-[22rem]">
                <Link
                  href={`/writing/${entry.slug}`}
                  className="group block overflow-hidden rounded-[1.7rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
                >
                  <div className="aspect-[1.28/0.72] border-b border-[var(--color-border)] p-3">
                    <WritingPreview
                      variant={
                        index === 0
                          ? "launch"
                          : index % 3 === 1
                            ? "diagram"
                            : index % 3 === 2
                              ? "landscape"
                              : "dark"
                      }
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] tracking-[0.14em] text-[var(--color-muted)] uppercase">
                      {entry.date} / {entry.category}
                    </p>
                    <h3 className="font-editorial mt-3 text-[1.45rem] leading-tight">
                      {entry.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                      {entry.summary}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="text-[11px] tracking-[0.14em] text-[var(--color-muted)] uppercase">
                        {entry.readingTime}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm text-[var(--color-text)]">
                        Read <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
            <div className="rounded-[1.8rem] border border-[var(--color-border)] bg-white px-5 py-5 shadow-[var(--shadow-soft)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-xl">
                  <p className="text-xs tracking-[0.18em] text-[var(--color-muted)] uppercase">
                    Active builds
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    The writing that sits closest to the products: what they
                    are, why they exist, and what still needs sorting.
                  </p>
                </div>
              </div>
              <div className="mt-5 divide-y divide-[var(--color-border)]">
                {activeBuildLinks.map(({ title, oneLine, href }) => (
                  <Link
                    key={title}
                    href={href}
                    className="grid gap-4 py-4 transition-colors duration-150 hover:bg-black/[0.012] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
                  >
                    <div>
                      <p className="font-editorial text-[1.2rem] leading-tight">{title}</p>
                      <p className="mt-1.5 text-sm leading-7 text-[var(--color-muted)]">
                        {oneLine}
                      </p>
                    </div>
                    <span className="text-sm text-[var(--color-muted)]">Open thread →</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(15,138,100,0.045),rgba(255,255,255,0.92))] px-5 py-5 shadow-[var(--shadow-soft)]">
              <p className="text-xs tracking-[0.18em] text-[var(--color-muted)] uppercase">
                Reusable workflow
              </p>
              <h3 className="font-editorial mt-3 text-[1.8rem] leading-tight">
                PR-to-Paper Trail
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                A reusable Codex workflow for reviewing pull requests and
                drafting the follow-up work people usually forget: ticket
                updates, doc prompts, follow-on actions, and an audit trail.
              </p>
              <div className="mt-5 space-y-3">
                {workflowLinks.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center justify-between rounded-[1rem] border border-[var(--color-border)] bg-white/90 px-4 py-3 text-sm text-[var(--color-text)] transition-colors duration-150 hover:bg-white"
                  >
                    <span>{label}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
