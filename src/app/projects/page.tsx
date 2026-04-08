import type { Metadata } from "next";
import { ProjectList } from "@/components/projects/project-list";
import { Container } from "@/components/ui/container";
import { PageIntro } from "@/components/ui/page-intro";
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
      <Container className="max-w-4xl py-20 sm:py-24">
        <PageIntro
          eyebrow="Projects"
          title="A small archive of product, systems, and experimental work."
          description="Six selected projects, grouped by the kind of engineering problem they address. The emphasis is on structure, implementation detail, and the shape of the solution rather than presentation for its own sake."
        />

        <div className="mt-16 space-y-14 sm:mt-20 sm:space-y-16">
          {projectsByCategory.map((section) => (
            <section key={section.category} aria-labelledby={section.category}>
              <div className="mb-5 sm:mb-6">
                <h2
                  id={section.category}
                  className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase"
                >
                  {section.category}
                </h2>
              </div>

              <ProjectList projects={section.projects} />
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
