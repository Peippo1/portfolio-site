import { NextResponse } from "next/server";
import { fetchTelemetryFeed } from "@/lib/telemetry-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const feed = await fetchTelemetryFeed();

  return NextResponse.json(feed, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
