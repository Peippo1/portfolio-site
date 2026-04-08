import { projects } from "@/data/projects";
import type { Project } from "@/types/content";

export type PortfolioSearchResult = {
} & Project & {
  score: number;
  reasons: string[];
};

type SearchContext = {
  query: string;
  terms: string[];
};

const categoryAliases: Record<Project["category"], string[]> = {
  "AI Products": ["ai", "product", "product-like", "workflow", "assistant"],
  "Data & Analytics": ["data", "analytics", "engineering", "engineering work"],
  "APIs & Services": ["api", "apis", "service", "backend", "integration"],
  Experiments: ["experiment", "prototype", "poc", "exploration"],
};

function normalizeQuery(query: string) {
  return query
    .trim()
    .toLowerCase()
    .replace(/[^\w\s+-]/g, " ");
}

function tokenize(query: string) {
  return Array.from(
    new Set(
      normalizeQuery(query)
        .split(/\s+/)
        .filter(Boolean)
    )
  );
}

function includesAny(text: string, terms: string[]) {
  const value = text.toLowerCase();
  return terms.some((term) => value.includes(term));
}

function scoreProject(project: Project, context: SearchContext) {
  let score = 0;
  const reasons: string[] = [];
  const haystack = [
    project.title,
    project.shortSummary,
    project.longSummary,
    project.category,
    project.stack.join(" "),
    project.problem,
    project.solution,
    project.highlights.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  if (context.terms.length === 0) {
    return { score: 0, reasons };
  }

  for (const term of context.terms) {
    if (project.title.toLowerCase().includes(term)) {
      score += 8;
      reasons.push(`title matches "${term}"`);
      continue;
    }

    if (project.stack.some((item) => item.toLowerCase().includes(term))) {
      score += 7;
      reasons.push(`stack includes "${term}"`);
      continue;
    }

    if (project.category.toLowerCase().includes(term)) {
      score += 6;
      reasons.push(`category matches "${term}"`);
      continue;
    }

    if (
      project.shortSummary.toLowerCase().includes(term) ||
      project.longSummary.toLowerCase().includes(term) ||
      project.problem.toLowerCase().includes(term) ||
      project.solution.toLowerCase().includes(term) ||
      project.highlights.some((highlight) => highlight.toLowerCase().includes(term))
    ) {
      score += 4;
      reasons.push(`content mentions "${term}"`);
      continue;
    }

    if (haystack.includes(term)) {
      score += 2;
    }
  }

  if (includesAny(project.category, context.terms)) {
    score += 4;
    reasons.push(`category aligns with ${project.category.toLowerCase()}`);
  }

  if (
    context.terms.includes("product-like") ||
    (context.terms.includes("product") && project.category === "AI Products")
  ) {
    score += project.category === "AI Products" ? 5 : 1;
    reasons.push("looks product-oriented");
  }

  if (
    context.terms.includes("data") ||
    context.terms.includes("analytics") ||
    context.terms.includes("engineering")
  ) {
    if (project.category === "Data & Analytics") {
      score += 5;
      reasons.push("fits data and analytics work");
    }
  }

  if (context.terms.includes("api") || context.terms.includes("backend")) {
    if (project.category === "APIs & Services") {
      score += 5;
      reasons.push("fits API/service work");
    }
  }

  return { score, reasons };
}

function getCategoryHint(query: string) {
  const normalized = normalizeQuery(query);
  return (Object.entries(categoryAliases) as Array<
    [Project["category"], string[]]
  >).find(([, aliases]) => aliases.some((alias) => normalized.includes(alias)));
}

export function searchPortfolioProjects(query: string) {
  const terms = tokenize(query);
  const context = { query, terms };
  const hint = getCategoryHint(query);

  const ranked = projects
    .map((project) => {
      const result = scoreProject(project, context);

      if (hint && project.category === hint[0]) {
        result.score += 4;
        result.reasons.push(`query leans toward ${hint[0].toLowerCase()}`);
      }

      return {
        ...project,
        ...result,
      };
    })
    .filter((project) => project.score > 0)
    .sort((a, b) => b.score - a.score || a.year.localeCompare(b.year));

  return ranked.slice(0, 4);
}
