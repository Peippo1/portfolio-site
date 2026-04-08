import type { Metadata } from "next";
import { AskThePortfolio } from "@/components/projects/ask-the-portfolio";
import { ProjectList } from "@/components/projects/project-list";
import { Container } from "@/components/ui/container";
import { projects } from "@/data/projects";
import type { Project } from "@/types/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated selection of AI systems, tools, and product work focused on reliability, clarity, and real-world usefulness.",
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
            Selected work across AI products, data systems, APIs, and
            experiments.
          </h1>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-8 text-[var(--color-muted)] sm:text-[1.08rem]">
            This archive highlights projects where product thinking and
            technical implementation had to stay aligned: practical AI tools,
            focused services, data-heavy workflows, and a few experimental
            systems built to test an idea carefully.
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
                      ? "Products where the model is part of the workflow, not the whole product."
                      : section.category === "Data & Analytics"
                        ? "Work focused on signal, structure, and making data easier to act on."
                        : section.category === "APIs & Services"
                          ? "Smaller services designed to slot into existing systems cleanly."
                          : "Explorations used to test a shape of interface, pipeline, or automation."}
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
