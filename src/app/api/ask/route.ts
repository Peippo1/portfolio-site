import { NextResponse } from "next/server";
import { searchPortfolioProjectsWithFallback } from "@/lib/portfolio-search";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { query?: string }
    | null;

  const query = body?.query?.trim() ?? "";

  if (!query) {
    return NextResponse.json(
      {
        results: [],
        message: "Ask about a stack, category, or style of work.",
      },
      { status: 200 }
    );
  }

  const { results, fallbackResults } = searchPortfolioProjectsWithFallback(query);

  return NextResponse.json({
    results,
    fallbackResults,
    message:
      results.length > 0
        ? `Found ${results.length} matching project${results.length === 1 ? "" : "s"}.`
        : "No strong matches found.",
  });
}
