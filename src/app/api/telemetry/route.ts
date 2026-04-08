import { NextResponse } from "next/server";
import { fetchTelemetryFeed } from "@/lib/telemetry-server";

export const revalidate = 60;

export async function GET() {
  const feed = await fetchTelemetryFeed();

  return NextResponse.json(feed, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
