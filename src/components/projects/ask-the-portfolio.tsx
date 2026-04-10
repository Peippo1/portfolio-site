"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import type { PortfolioSearchResult } from "@/lib/portfolio-search";

type AskThePortfolioResponse = {
  results: PortfolioSearchResult[];
  fallbackResults?: PortfolioSearchResult[];
  message: string;
};

const examplePrompts = [
  "Which projects use FastAPI?",
  "Show data systems work",
  "What feels most product-like?",
];

export function AskThePortfolio() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PortfolioSearchResult[]>([]);
  const [fallbackResults, setFallbackResults] = useState<PortfolioSearchResult[]>([]);
  const [message, setMessage] = useState(
    "Ask about a stack, category, or style of work."
  );
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setFallbackResults([]);
      setMessage("Ask about a stack, category, or style of work.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: trimmed }),
      });

      const data = (await response.json()) as AskThePortfolioResponse;
      setResults(data.results);
      setFallbackResults(data.fallbackResults ?? []);
      setMessage(data.message);
    } catch {
      setResults([]);
      setFallbackResults([]);
      setMessage("Search is temporarily unavailable.");
    } finally {
      setIsLoading(false);
    }
  }

  function applyExample(prompt: string) {
    setQuery(prompt);
  }

  return (
    <section
      aria-labelledby="ask-the-portfolio"
      className="border-t border-[var(--color-border)] pt-8"
    >
      <div className="max-w-3xl">
        <h2
          id="ask-the-portfolio"
          className="text-sm font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase"
        >
          Ask the portfolio
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
          Search the local project data by stack, category, or working style.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="portfolio-query">
          Ask the portfolio
        </label>
        <input
          id="portfolio-query"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Try "Which projects use FastAPI?"'
          className="w-full rounded-md border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition-colors duration-150 focus:border-[rgba(17,17,17,0.2)] focus-visible:bg-black/[0.015] focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-text)] transition-colors duration-150 hover:bg-black/[0.03] focus-visible:bg-black/[0.03] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Searching" : "Search"}
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {examplePrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => applyExample(prompt)}
            className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs tracking-[0.08em] text-[var(--color-muted)] transition-colors duration-150 hover:bg-black/[0.03] hover:text-[var(--color-text)] focus-visible:bg-black/[0.03] focus-visible:text-[var(--color-text)] focus-visible:outline-none"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="mt-6 border-t border-[var(--color-border)] pt-4">
        <p className="text-sm leading-7 text-[var(--color-muted)]">{message}</p>

        {results.length > 0 || fallbackResults.length > 0 ? (
          <ul className="mt-4 divide-y divide-[var(--color-border)]">
            {(results.length > 0 ? results : fallbackResults).map((project) => (
              <li key={project.slug} className="py-4 first:pt-0 last:pb-0">
                <Link
                  href={project.href}
                  className="group block rounded-md transition-colors duration-150 hover:bg-black/[0.02] focus-visible:bg-black/[0.02] focus-visible:outline-none"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-editorial text-[1.25rem] leading-tight text-[var(--color-text)] sm:text-[1.35rem]">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
                        {project.explanation}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-sm text-[var(--color-muted)] transition-transform duration-150 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            Results will appear here once you ask a question.
          </p>
        )}
      </div>
    </section>
  );
}
