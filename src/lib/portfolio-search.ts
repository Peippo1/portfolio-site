import { projects } from "@/data/projects";
import type { Project } from "@/types/content";

export type PortfolioSearchResult = Project & {
  href: string;
  explanation: string;
  score: number;
  reasons: string[];
};

type SearchContext = {
  terms: string[];
  normalized: string;
};

type IntentMatcher = {
  terms: string[];
  categories: Project["category"][];
  bonus: number;
  explanation: string;
};

const categoryAliases: Record<Project["category"], string[]> = {
  "AI Products": ["ai", "product", "product-oriented", "product like"],
  "Data & Analytics": ["data", "analytics", "data engineering", "pipeline"],
  "APIs & Services": ["api", "apis", "service", "backend", "integration"],
  Experiments: ["experiment", "prototype", "poc", "exploration"],
};

const intentMatchers: IntentMatcher[] = [
  {
    terms: ["fastapi"],
    categories: ["Data & Analytics", "APIs & Services"],
    bonus: 5,
    explanation: "This work uses FastAPI or a similar service layer.",
  },
  {
    terms: ["data engineering", "pipeline", "ingestion", "streaming"],
    categories: ["Data & Analytics"],
    bonus: 5,
    explanation: "This is closer to data engineering or analytics work.",
  },
  {
    terms: ["product", "product-oriented", "product oriented", "product-like"],
    categories: ["AI Products"],
    bonus: 5,
    explanation: "This reads most like a product-facing AI workflow.",
  },
  {
    terms: ["api", "apis", "openai", "llm", "backend"],
    categories: ["APIs & Services", "AI Products"],
    bonus: 5,
    explanation: "This touches AI APIs, backend orchestration, or service design.",
  },
];

function normalizeQuery(query: string) {
  return query.trim().toLowerCase().replace(/[^\w\s+-]/g, " ");
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

function buildExplanation(project: Project, reasons: string[]) {
  const uniqueReasons = Array.from(new Set(reasons)).slice(0, 2);

  if (uniqueReasons.length === 0) {
    return `Relevant because it sits in ${project.category.toLowerCase()}.`;
  }

  return uniqueReasons
    .map((reason) => reason.replace(/^./, (character) => character.toUpperCase()))
    .join(". ");
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
    return { score: 0, reasons, explanation: "" };
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

  const matchedIntents = intentMatchers.filter((matcher) =>
    matcher.terms.some((term) => context.normalized.includes(term))
  );

  for (const matcher of matchedIntents) {
    if (matcher.categories.includes(project.category)) {
      score += matcher.bonus;
      reasons.push(matcher.explanation);
    }
  }

  if (
    context.normalized.includes("fastapi") &&
    project.stack.some((item) => item.toLowerCase().includes("fastapi"))
  ) {
    score += 4;
    reasons.push("stack includes FastAPI");
  }

  if (
    context.normalized.includes("product") &&
    project.category === "AI Products"
  ) {
    score += 4;
    reasons.push("product-oriented framing");
  }

  if (
    (context.normalized.includes("data engineering") ||
      context.normalized.includes("pipeline") ||
      context.normalized.includes("ingestion")) &&
    project.category === "Data & Analytics"
  ) {
    score += 4;
    reasons.push("data engineering shape");
  }

  if (
    (context.normalized.includes("api") ||
      context.normalized.includes("openai") ||
      context.normalized.includes("llm")) &&
    (project.category === "APIs & Services" ||
      project.stack.some((item) => item.toLowerCase().includes("openai")))
  ) {
    score += 4;
    reasons.push("AI API or service work");
  }

  return {
    score,
    reasons,
    explanation: buildExplanation(project, reasons),
  };
}

function getCategoryHint(query: string) {
  const normalized = normalizeQuery(query);
  return (Object.entries(categoryAliases) as Array<
    [Project["category"], string[]]
  >).find(([, aliases]) => aliases.some((alias) => normalized.includes(alias)));
}

export function searchPortfolioProjects(query: string) {
  const terms = tokenize(query);
  const context = { terms, normalized: normalizeQuery(query) };
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
        href: `/projects/${project.slug}`,
        ...result,
      };
    })
    .filter((project) => project.score > 0)
    .sort((a, b) => b.score - a.score || b.year.localeCompare(a.year));

  return ranked.slice(0, 4);
}
