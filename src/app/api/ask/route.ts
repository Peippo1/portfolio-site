import { NextResponse } from "next/server";
import {
  detectQueryIntent,
  searchPortfolioProjectsWithFallback,
} from "@/lib/portfolio-search";

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

  const intent = detectQueryIntent(query);
  const { results, fallbackResults } = searchPortfolioProjectsWithFallback(query);

  const responseMessage =
    results.length > 0
      ? intent === "explain"
        ? `Here’s a broader view of ${results.length} matching project${results.length === 1 ? "" : "s"}.`
        : intent === "list"
          ? `Listing ${results.length} matching project${results.length === 1 ? "" : "s"}.`
          : `Found ${results.length} matching project${results.length === 1 ? "" : "s"}.`
      : fallbackResults.length > 0
        ? "No strong matches found. Showing a few close suggestions."
        : "No strong matches found.";

  return NextResponse.json({
    results,
    fallbackResults,
    message: responseMessage,
  });
}
