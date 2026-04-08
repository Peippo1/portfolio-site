"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import type { PortfolioSearchResult } from "@/lib/portfolio-search";

type AskThePortfolioResponse = {
  results: PortfolioSearchResult[];
  message: string;
};

const examplePrompts = [
  "Which projects use FastAPI?",
  "Show data engineering work",
  "Which project is most product-like?",
];

export function AskThePortfolio() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PortfolioSearchResult[]>([]);
  const [message, setMessage] = useState(
    "Try a question about stack, category, or project style."
  );
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setMessage("Try a question about stack, category, or project style.");
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
      setMessage(data.message);
    } catch {
      setResults([]);
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
      className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-soft)] sm:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
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
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="portfolio-query">
          Ask the portfolio
        </label>
        <input
          id="portfolio-query"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Try "Which projects use FastAPI?"'
          className="w-full rounded-full border border-[var(--color-border)] bg-transparent px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition-colors duration-150 focus:border-[rgba(17,17,17,0.2)] focus-visible:bg-black/[0.015] focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-full border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-text)] transition-colors duration-150 hover:bg-black/[0.03] focus-visible:bg-black/[0.03] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Searching" : "Ask"}
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

      <div className="mt-5 border-t border-[var(--color-border)] pt-4">
        <p className="text-sm leading-7 text-[var(--color-muted)]">{message}</p>

        {results.length > 0 ? (
          <div className="mt-4 divide-y divide-[var(--color-border)]">
            {results.map((project) => (
              <article key={project.slug} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-2xl">
                    <Link
                      href={project.href}
                      className="font-editorial text-[1.35rem] leading-tight transition-colors duration-150 hover:text-[var(--color-text)] focus-visible:text-[var(--color-text)] focus-visible:outline-none sm:text-[1.5rem]"
                    >
                      {project.title}
                    </Link>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                      {project.explanation}
                    </p>
                  </div>

                  <div className="text-sm text-[var(--color-muted)]">
                    {project.category}
                  </div>
                </div>

                <p className="mt-3 text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase">
                  {project.stack.join(" / ")}
                </p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
