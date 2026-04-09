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
  expandedTerms: string[];
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
  label: string
) {
  const normalizedField = normalizeQuery(fieldText);
  const fieldTokens = tokenizeText(fieldText);

  return terms.reduce((score, term) => {
    const exactMatch =
      fieldTokens.includes(term) || normalizedField === term || normalizedField.includes(` ${term} `);

    if (exactMatch) {
      reasons.push(`${label} exact match "${term}"`);
      return score + exactScore;
    }

    if (normalizedField.includes(term)) {
      reasons.push(`${label} mentions "${term}"`);
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

function scoreProject(project: Project, context: SearchContext) {
  let score = 0;
  const reasons: string[] = [];
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

  score += scoreField(context.expandedTerms, project.title, 3, 2, reasons, "title");
  score += scoreField(context.expandedTerms, project.stack.join(" "), 3, 2, reasons, "stack");
  score += scoreField(context.expandedTerms, project.category, 2, 1, reasons, "category");
  score += scoreField(context.expandedTerms, summaryText, 2, 1, reasons, "summary");
  score += scoreField(context.expandedTerms, highlightsText, 1, 0.5, reasons, "highlights");

  return {
    score,
    reasons,
    explanation: buildExplanation(project, reasons),
  };
}

export function searchPortfolioProjects(query: string) {
  const terms = tokenize(query);
  const context = { terms, expandedTerms: expandTerms(terms) };

  const ranked = projects
    .map((project) => {
      const result = scoreProject(project, context);

      return {
        ...project,
        href: `/projects/${project.slug}`,
        ...result,
      };
    })
    .filter((project) => project.score > 1)
    .sort((a, b) => b.score - a.score || b.year.localeCompare(a.year));

  return ranked.slice(0, 4);
}
