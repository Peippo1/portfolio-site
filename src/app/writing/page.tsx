import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  getCampaignForgeSeriesEntries,
  getCityScoutSeriesEntries,
  getCreatorOSSeriesEntries,
  getEvalKitSeriesEntries,
  getHoxaSeriesEntries,
  getStandaloneArchiveEntries,
} from "@/data/writing-release-readiness";
import type { WritingEntry } from "@/types/content";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Writing on AI products, engineering, product decisions, and the real work of making systems usable.",
};

const cutoutStudioLaunchEntry: WritingEntry = {
  slug: "cutout-studio-beta-launch",
  title: "Launching Cutout Studio as a Verified Beta",
  date: "July 12, 2026",
  category: "Product Launch",
  summary:
    "How Cutout Studio moved from a simple background-removal tool to a safer public beta with verified login, moderation, audit logging, and no image retention by default.",
  readingTime: "7 min read",
};

function ThreadPreview({ slug }: { slug: string }) {
  if (slug === "hoxa-build-thread") {
    return (
      <div className="h-full rounded-[1.4rem] bg-[radial-gradient(circle_at_20%_24%,rgba(89,233,167,0.2),transparent_20%),linear-gradient(180deg,rgba(13,16,18,1),rgba(21,27,25,0.96))] p-4 text-white">
        <div className="grid h-full grid-cols-2 gap-3">
          <div className="rounded-[1rem] border border-white/10 p-3">
            <div className="text-2xl font-semibold">12,451</div>
            <div className="mt-1 text-[10px] tracking-[0.16em] text-white/55 uppercase">
              Contacts
            </div>
          </div>
          <div className="rounded-[1rem] border border-white/10 p-3">
            <div className="text-2xl font-semibold">8.7%</div>
            <div className="mt-1 text-[10px] tracking-[0.16em] text-white/55 uppercase">
              Reply rate
            </div>
          </div>
          <div className="col-span-2 rounded-[1rem] border border-white/10 p-3">
            <div className="mt-1 flex h-12 items-end gap-1">
              {[22, 31, 29, 45, 41, 57, 62, 76].map((value, index) => (
                <div
                  key={index}
                  className="w-full rounded-t-full bg-[linear-gradient(180deg,rgba(89,233,167,0.85),rgba(89,233,167,0.2))]"
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "evalkit-build-thread") {
    return (
      <div className="flex h-full items-center justify-center rounded-[1.4rem] border border-[rgba(15,138,100,0.14)] bg-[radial-gradient(circle_at_16%_18%,rgba(15,138,100,0.14),transparent_16%),linear-gradient(135deg,#fbfdfc,#eef7f3)] p-5">
        <div className="grid w-full grid-cols-4 gap-3 text-center text-[10px] tracking-[0.12em] text-[var(--color-muted)] uppercase">
          {["Inputs", "Outputs", "Scoring", "Report"].map((label) => (
            <div key={label} className="space-y-2">
              <div className="h-14 rounded-[0.9rem] border border-[rgba(15,138,100,0.12)] bg-white/80" />
              <div>{label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slug === "cityscout-build-thread") {
    return (
      <div className="h-full rounded-[1.4rem] bg-[radial-gradient(circle_at_22%_26%,rgba(83,147,181,0.2),transparent_20%),linear-gradient(135deg,#dce7e8,#f7f9fa)] p-4">
        <div className="grid h-full grid-cols-[1.15fr_0.85fr] gap-3">
          <div className="rounded-[1rem] border border-black/8 bg-[radial-gradient(circle_at_30%_28%,rgba(58,130,164,0.22),transparent_18%),linear-gradient(180deg,rgba(83,147,181,0.12),rgba(255,255,255,0.9))]" />
          <div className="space-y-2">
            <div className="rounded-[1rem] border border-black/8 bg-white/90 p-3">
              <div className="h-2.5 w-16 rounded-full bg-black/10" />
              <div className="mt-3 space-y-2">
                <div className="h-8 rounded-[0.7rem] bg-black/[0.05]" />
                <div className="h-8 rounded-[0.7rem] bg-black/[0.05]" />
              </div>
            </div>
            <div className="h-16 rounded-[1rem] border border-black/8 bg-white/80" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-[1.4rem] bg-[radial-gradient(circle_at_78%_24%,rgba(148,136,219,0.14),transparent_20%),linear-gradient(180deg,rgba(58,71,91,0.06),rgba(16,17,20,0.04)),linear-gradient(135deg,#dbe2ea,#f6f7f9)] p-4">
      <div className="h-full rounded-[1rem] border border-black/8 bg-white/70" />
    </div>
  );
}

function ArchiveList({ entries }: { entries: WritingEntry[] }) {
  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
      <div className="grid grid-cols-[minmax(0,1.4fr)_auto_auto_auto] gap-4 border-b border-[var(--color-border)] px-5 py-3 text-[11px] tracking-[0.14em] text-[var(--color-muted)] uppercase sm:px-6">
        <span>Title</span>
        <span>Category</span>
        <span>Date</span>
        <span className="text-right">Read</span>
      </div>
      {entries.map((entry, index) => (
        <article
          key={entry.slug}
          className={
            index === entries.length - 1
              ? ""
              : "border-b border-[var(--color-border)]"
          }
        >
          <Link
            href={`/writing/${entry.slug}`}
            className="group grid gap-4 px-5 py-5 transition-colors duration-150 hover:bg-black/[0.012] focus-visible:bg-black/[0.02] focus-visible:outline-none sm:grid-cols-[minmax(0,1.4fr)_auto_auto_auto] sm:items-center sm:gap-6 sm:px-6"
            aria-label={`Read ${entry.title}`}
          >
            <div className="min-w-0">
              <h2 className="font-editorial text-[1.35rem] leading-tight transition-colors duration-150 group-hover:text-[var(--color-text)] sm:text-[1.5rem]">
                {entry.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
                {entry.summary}
              </p>
            </div>
            <span className="text-[11px] tracking-[0.14em] text-[var(--color-muted)] uppercase">
              {entry.category}
            </span>
            <span className="text-[11px] tracking-[0.14em] text-[var(--color-muted)] uppercase">
              {entry.date}
            </span>
            <span className="inline-flex items-center justify-end gap-2 text-sm text-[var(--color-muted)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--color-text)]">
              {entry.readingTime ?? "Read"} <span aria-hidden="true">→</span>
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}

export default function WritingPage() {
  const campaignForgeSeriesEntries = getCampaignForgeSeriesEntries();
  const cityScoutSeriesEntries = getCityScoutSeriesEntries();
  const hoxaSeriesEntries = getHoxaSeriesEntries();
  const creatorOSSeriesEntries = getCreatorOSSeriesEntries();
  const evalKitSeriesEntries = getEvalKitSeriesEntries();
  const archiveEntries = [cutoutStudioLaunchEntry, ...getStandaloneArchiveEntries()];
  const campaignForgeSeries = campaignForgeSeriesEntries[0]?.series;
  const cityScoutSeries = cityScoutSeriesEntries[0]?.series;
  const hoxaSeries = hoxaSeriesEntries[0]?.series;
  const creatorOSSeries = creatorOSSeriesEntries[0]?.series;
  const evalKitSeries = evalKitSeriesEntries[0]?.series;
  const featuredSeries = [
    campaignForgeSeries
      ? {
          series: campaignForgeSeries,
          entries: campaignForgeSeriesEntries,
          summaryLine: "Three posts / Positioning, commercial path, and hosted-product reality",
        }
      : null,
    cityScoutSeries
      ? {
          series: cityScoutSeries,
          entries: cityScoutSeriesEntries,
          summaryLine: "Four posts / Product strategy, architecture, roadmap, and release readiness",
        }
      : null,
    hoxaSeries
      ? {
          series: hoxaSeries,
          entries: hoxaSeriesEntries,
          summaryLine: "Seven posts / Product, design, architecture, and process",
        }
      : null,
    creatorOSSeries
      ? {
          series: creatorOSSeries,
          entries: creatorOSSeriesEntries,
          summaryLine: "One post / Product strategy and agent architecture",
        }
      : null,
    evalKitSeries
      ? {
          series: evalKitSeries,
          entries: evalKitSeriesEntries,
          summaryLine: "Three posts / Launch, evaluation strategy, and engine architecture",
        }
      : null,
  ].filter(
    (
      item
    ): item is {
      series: NonNullable<
        | typeof campaignForgeSeries
        | typeof cityScoutSeries
        | typeof hoxaSeries
        | typeof creatorOSSeries
        | typeof evalKitSeries
      >;
      entries: WritingEntry[];
      summaryLine: string;
    } => item !== null
  );

  const essayCount =
    campaignForgeSeriesEntries.length +
    cityScoutSeriesEntries.length +
    hoxaSeriesEntries.length +
    creatorOSSeriesEntries.length +
    evalKitSeriesEntries.length +
    archiveEntries.length;
  const threadCount = featuredSeries.length;
  const productCount = featuredSeries.length;

  return (
    <main>
      <Container className="py-16 sm:py-20 lg:py-24">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,1.1fr)] lg:items-center">
          <div className="max-w-2xl">
            <h1 className="font-editorial text-[3rem] leading-[0.95] sm:text-[4rem] lg:text-[4.6rem]">
              Writing.
            </h1>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-8 text-[var(--color-muted)] sm:text-[1.1rem]">
              Build threads, product notes, and technical writing about trying
              to make useful software instead of just interesting prototypes.
            </p>
          </div>
          <div className="flex min-h-[15rem] items-center justify-center rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] border border-[var(--color-border)] bg-[radial-gradient(circle_at_16%_22%,rgba(15,138,100,0.12),transparent_18%),radial-gradient(circle_at_84%_28%,rgba(83,147,181,0.14),transparent_22%),linear-gradient(135deg,#fbfcfb,#f3f6f5_56%,#ffffff)] p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                {["Build threads", "Case studies", "Product notes"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-[var(--color-border)] bg-white/78 px-3 py-1 text-[11px] tracking-[0.14em] text-[var(--color-muted)] uppercase"
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[1.4rem] border border-[var(--color-border)] bg-white/76 p-4">
                  <div className="h-2 w-20 rounded-full bg-[rgba(15,138,100,0.5)]" />
                  <div className="mt-4 space-y-2.5">
                    <div className="h-3 w-[82%] rounded-full bg-black/[0.08]" />
                    <div className="h-3 w-[68%] rounded-full bg-black/[0.06]" />
                    <div className="h-3 w-[74%] rounded-full bg-black/[0.05]" />
                  </div>
                </div>
                <div className="rounded-[1.4rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(83,147,181,0.12),rgba(255,255,255,0.72))]" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-[1.2rem] border border-[var(--color-border)] bg-white/82 p-3">
                  <div className="text-[11px] tracking-[0.14em] text-[var(--color-muted)] uppercase">
                    Essays
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{essayCount}</div>
                </div>
                <div className="rounded-[1.2rem] border border-[var(--color-border)] bg-white/82 p-3">
                  <div className="text-[11px] tracking-[0.14em] text-[var(--color-muted)] uppercase">
                    Threads
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{threadCount}</div>
                </div>
                <div className="rounded-[1.2rem] border border-[var(--color-border)] bg-white/82 p-3 col-span-2 sm:col-span-1">
                  <div className="text-[11px] tracking-[0.14em] text-[var(--color-muted)] uppercase">
                    Products
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{productCount}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[1.8rem] border border-[var(--color-border)] bg-white px-5 py-5 shadow-[var(--shadow-soft)] sm:px-6">
          <p className="text-xs tracking-[0.18em] text-[var(--color-muted)] uppercase">
            Latest launch note
          </p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="font-editorial text-[1.9rem] leading-tight sm:text-[2.35rem]">
                Launching Cutout Studio as a Verified Beta.
              </h2>
              <p className="mt-3 text-[1rem] leading-8 text-[var(--color-muted)] sm:text-[1.04rem]">
                A background-removal tool becomes a much more serious product
                once you treat public use, abuse handling, moderation, and
                operator accountability as first-class requirements.
              </p>
            </div>
            <Link
              href="/writing/cutout-studio-beta-launch"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:text-[var(--color-text)]"
            >
              Read launch post <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.18em] text-[var(--color-muted)] uppercase">
              Featured build threads
            </p>
            <h2 className="font-editorial mt-3 text-[2rem] leading-tight sm:text-[2.45rem]">
              Writing tied directly to products in progress.
            </h2>
            <p className="mt-4 text-[1rem] leading-8 text-[var(--color-muted)] sm:text-[1.04rem]">
              These series are where I work through product shape,
              architecture, trade-offs, and commercial questions without
              turning the writing into vague progress theatre.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {featuredSeries.map(({ series, entries, summaryLine }) => (
              <article
                key={series.slug}
                className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]"
              >
                <div className="p-5 lg:p-6">
                  <div className="aspect-[1.2/0.72]">
                    <ThreadPreview slug={series.slug} />
                  </div>
                  <div className="mt-5">
                    <p className="text-[11px] tracking-[0.16em] text-[var(--color-muted)] uppercase">
                      {summaryLine}
                    </p>
                    <h3 className="font-editorial mt-3 text-[2rem] leading-tight sm:text-[2.3rem]">
                      {series.name}
                    </h3>
                    <p className="mt-4 max-w-xl text-[1rem] leading-8 text-[var(--color-muted)] sm:text-[1.04rem]">
                      {series.description}
                    </p>
                    <ol className="mt-6 divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
                      {entries.slice(0, 2).map((entry, entryIndex) => (
                        <li
                          key={entry.slug}
                          className={entryIndex === 0 ? "pt-5 pb-5" : "py-5"}
                        >
                          <Link
                            href={`/writing/${entry.slug}`}
                            className="group block rounded-sm focus-visible:bg-black/[0.02] focus-visible:outline-none"
                          >
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                              <span>Part {entry.series?.order}</span>
                              <span aria-hidden="true">/</span>
                              <span>{entry.date}</span>
                            </div>
                            <h4 className="font-editorial mt-3 text-[1.4rem] leading-tight transition-colors duration-150 group-hover:text-[var(--color-text)] sm:text-[1.6rem]">
                              {entry.title}
                            </h4>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-[0.98rem] sm:leading-8">
                              {entry.summary}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ol>
                    <Link
                      href={`/writing/${entries[0]?.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors duration-150 hover:text-[var(--color-text)]"
                    >
                      Open thread <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.18em] text-[var(--color-muted)] uppercase">
              All writing
            </p>
            <h2 className="font-editorial mt-3 text-[2rem] leading-tight sm:text-[2.35rem]">
              Shorter notes, essays, and archive pieces.
            </h2>
          </div>

          <div className="mt-8">
            <ArchiveList entries={archiveEntries} />
          </div>
        </section>
      </Container>
    </main>
  );
}
