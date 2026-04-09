import { projects } from "@/data/projects";
import type { Project } from "@/types/content";

export type PortfolioSearchResult = Project & {
  href: string;
  explanation: string;
  score: number;
  reasons: string[];
};

export type PortfolioSearchResponse = {
  results: PortfolioSearchResult[];
  fallbackResults: PortfolioSearchResult[];
};

export type QueryIntent = "filter" | "list" | "explain" | "default";

type SearchContext = {
  terms: string[];
  expandedTerms: string[];
};

type FieldMatches = {
  title: string[];
  stack: string[];
  category: string[];
  summary: string[];
  highlights: string[];
};

const stopWords = new Set([
  "is",
  "the",
  "a",
  "an",
  "what",
  "which",
  "show",
  "me",
  "do",
  "does",
  "with",
  "and",
  "or",
  "to",
  "for",
  "of",
]);

const synonymMap: Record<string, string[]> = {
  ai: ["llm", "models", "openai"],
  api: ["fastapi", "service", "backend"],
  data: ["pipeline", "etl", "analytics"],
  frontend: ["ui", "react", "interface"],
  product: ["app", "platform", "tool"],
};

const synonymLookup = new Map(
  Object.entries(synonymMap).flatMap(([key, values]) => [
    [key, key],
    ...values.map((value) => [value, key] as const),
  ])
);

function normalizeQuery(query: string) {
  return query
    .trim()
    .toLowerCase()
    .replace(/[^\w\s+-]/g, " ")
    .replace(/\s+/g, " ");
}

function tokenize(query: string) {
  return Array.from(
    new Set(
      normalizeQuery(query)
        .split(/\s+/)
        .filter(Boolean)
        .filter((term) => !stopWords.has(term))
    )
  );
}

export function detectQueryIntent(query: string): QueryIntent {
  const normalized = normalizeQuery(query);

  if (normalized.includes("which")) {
    return "filter";
  }

  if (normalized.includes("show")) {
    return "list";
  }

  if (normalized.includes("what")) {
    return "explain";
  }

  return "default";
}

function expandTerms(terms: string[]) {
  const expanded = new Set<string>();

  for (const term of terms) {
    expanded.add(term);

    const canonical = synonymLookup.get(term) ?? term;
    expanded.add(canonical);

    const relatedTerms = synonymMap[canonical];

    if (relatedTerms) {
      for (const relatedTerm of relatedTerms) {
        expanded.add(relatedTerm);
      }
    }
  }

  return Array.from(expanded);
}

function tokenizeText(text: string) {
  return normalizeQuery(text)
    .split(/\s+/)
    .filter(Boolean);
}

function scoreField(
  terms: string[],
  fieldText: string,
  exactScore: number,
  partialScore: number,
  reasons: string[],
  label: string,
  matches: string[]
) {
  const normalizedField = normalizeQuery(fieldText);
  const fieldTokens = tokenizeText(fieldText);

  return terms.reduce((score, term) => {
    const exactMatch =
      fieldTokens.includes(term) || normalizedField === term || normalizedField.includes(` ${term} `);

    if (exactMatch) {
      reasons.push(`${label} exact match "${term}"`);
      matches.push(term);
      return score + exactScore;
    }

    if (normalizedField.includes(term)) {
      reasons.push(`${label} mentions "${term}"`);
      matches.push(term);
      return score + partialScore;
    }

    return score;
  }, 0);
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

function cleanTermList(terms: string[]) {
  return Array.from(new Set(terms)).slice(0, 3);
}

function explainFromMatches(project: Project, matches: FieldMatches) {
  const stackTerms = cleanTermList(matches.stack);
  const categoryTerms = cleanTermList(matches.category);
  const summaryTerms = cleanTermList(matches.summary);
  const highlightTerms = cleanTermList(matches.highlights);

  if (stackTerms.some((term) => term.includes("fastapi"))) {
    return "Uses FastAPI for backend services.";
  }

  if (
    stackTerms.some((term) => term.includes("openai") || term.includes("llm")) ||
    summaryTerms.some((term) => term.includes("openai") || term.includes("llm") || term.includes("ai"))
  ) {
    return "AI-driven workflow system with structured outputs.";
  }

  if (
    categoryTerms.some((term) => term.includes("data")) ||
    summaryTerms.some((term) => term.includes("pipeline") || term.includes("analytics")) ||
    highlightTerms.some((term) => term.includes("pipeline") || term.includes("trend"))
  ) {
    return "Focuses on data pipelines and trend analysis.";
  }

  if (
    stackTerms.some((term) => term.includes("react") || term.includes("ui") || term.includes("interface")) ||
    categoryTerms.some((term) => term.includes("ai products") || term.includes("product"))
  ) {
    return "Product-facing system with a clear user workflow.";
  }

  if (stackTerms.length > 0) {
    return `Uses ${stackTerms[0]} in the core stack.`;
  }

  if (categoryTerms.length > 0) {
    return `Sits in ${project.category.toLowerCase()}.`;
  }

  if (summaryTerms.length > 0) {
    return `Mentions ${summaryTerms[0]} in the project summary.`;
  }

  if (highlightTerms.length > 0) {
    return `Highlights ${highlightTerms[0]} as a notable capability.`;
  }

  return `Relevant because it sits in ${project.category.toLowerCase()}.`;
}

function scoreProject(project: Project, context: SearchContext) {
  let score = 0;
  const reasons: string[] = [];
  const matches: FieldMatches = {
    title: [],
    stack: [],
    category: [],
    summary: [],
    highlights: [],
  };
  const summaryText = [
    project.shortSummary,
    project.longSummary,
    project.problem,
    project.solution,
  ].join(" ");
  const highlightsText = project.highlights.join(" ");

  if (context.terms.length === 0) {
    return { score: 0, reasons, explanation: "" };
  }

  score += scoreField(
    context.expandedTerms,
    project.title,
    3,
    2,
    reasons,
    "title",
    matches.title
  );
  score += scoreField(
    context.expandedTerms,
    project.stack.join(" "),
    3,
    2,
    reasons,
    "stack",
    matches.stack
  );
  score += scoreField(
    context.expandedTerms,
    project.category,
    2,
    1,
    reasons,
    "category",
    matches.category
  );
  score += scoreField(
    context.expandedTerms,
    summaryText,
    2,
    1,
    reasons,
    "summary",
    matches.summary
  );
  score += scoreField(
    context.expandedTerms,
    highlightsText,
    1,
    0.5,
    reasons,
    "highlights",
    matches.highlights
  );

  return {
    score,
    reasons,
    explanation: explainFromMatches(project, matches) || buildExplanation(project, reasons),
  };
}

function rankPortfolioProjects(query: string) {
  const terms = tokenize(query);
  const context = { terms, expandedTerms: expandTerms(terms) };

  return projects
    .map((project) => {
      const result = scoreProject(project, context);

      return {
        ...project,
        href: `/projects/${project.slug}`,
        ...result,
      };
    })
    .sort((a, b) => b.score - a.score || b.year.localeCompare(a.year));
}

export function searchPortfolioProjects(query: string) {
  return rankPortfolioProjects(query).filter((project) => project.score > 1).slice(0, 3);
}

export function searchPortfolioProjectsWithFallback(query: string) {
  const ranked = rankPortfolioProjects(query);
  const results = ranked.filter((project) => project.score > 1).slice(0, 3);
  const fallbackResults = results.length === 0 ? ranked.filter((project) => project.score > 0).slice(0, 2) : [];

  return { results, fallbackResults };
}
