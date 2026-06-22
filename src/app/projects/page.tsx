import type { Metadata } from "next";
import { AskThePortfolio } from "@/components/projects/ask-the-portfolio";
import { ProjectList } from "@/components/projects/project-list";
import { Container } from "@/components/ui/container";
import { projects } from "@/data/projects";
import type { Project } from "@/types/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of product, AI, and systems work shaped around clarity, usefulness, and solid engineering.",
};

const categoryOrder: Project["category"][] = [
  "AI Products",
  "Data & Analytics",
  "APIs & Services",
  "Experiments",
];

const projectsByCategory = categoryOrder
  .map((category) => ({
    category,
    projects: projects.filter((project) => project.category === category),
  }))
  .filter((section) => section.projects.length > 0);

export default function ProjectsPage() {
  return (
    <main>
      <Container className="max-w-5xl py-16 sm:py-20 lg:py-24">
        <header className="max-w-3xl">
          <p className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
            Projects
          </p>
          <h1 className="font-editorial mt-5 max-w-2xl text-4xl leading-tight sm:text-5xl">
            Product work, AI systems, APIs, and a few useful experiments.
          </h1>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-8 text-[var(--color-muted)] sm:text-[1.08rem]">
            This is the work where product thinking and implementation stayed
            close together: practical AI tools, focused services, data-heavy
            workflows, and a few experiments built to test an idea properly.
          </p>
        </header>

        <div className="mt-12 sm:mt-14">
          <AskThePortfolio />
        </div>

        <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-16">
          {projectsByCategory.map((section) => (
            <section key={section.category} aria-labelledby={section.category}>
              <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2
                    id={section.category}
                    className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase"
                  >
                    {section.category}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
                    {section.category === "AI Products"
                      ? "Products where the model supports the workflow instead of pretending to be the whole product."
                      : section.category === "Data & Analytics"
                        ? "Work focused on signal, structure, and making data easier to use."
                        : section.category === "APIs & Services"
                          ? "Smaller services designed to fit neatly into larger systems."
                          : "Explorations used to test an interface, pipeline, or automation idea."}
                  </p>
                </div>
                <p className="text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase">
                  {section.projects.length} projects
                </p>
              </div>

              <ProjectList projects={section.projects} />
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
