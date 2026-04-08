import Link from "next/link";
import type { Project } from "@/types/content";

type ProjectListProps = {
  projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
      {projects.map((project) => (
        <article key={project.slug} className="group">
          <Link
            href={`/projects/${project.slug}`}
            className="grid gap-5 rounded-[1rem] px-1 py-6 transition-colors duration-150 hover:bg-black/[0.015] focus-visible:bg-black/[0.02] focus-visible:outline-none sm:gap-6 sm:py-7 sm:px-2 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-editorial text-[1.6rem] leading-tight transition-colors duration-150 group-hover:text-[var(--color-text)] sm:text-[1.9rem]">
                  {project.title}
                </h3>
                <span className="text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase">
                  {project.year}
                </span>
              </div>

              <p className="mt-2.5 max-w-2xl text-[0.96rem] leading-7 text-[var(--color-muted)] sm:text-[1rem]">
                {project.shortSummary}
              </p>

              <p className="mt-3 text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase">
                {project.stack.join(" / ")}
              </p>
            </div>

            <div className="flex items-start md:justify-end">
              <span className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--color-text)]">
                Open case study
                <span aria-hidden="true">↗</span>
              </span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
