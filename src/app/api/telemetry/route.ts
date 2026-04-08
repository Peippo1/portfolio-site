import { NextResponse } from "next/server";
import { mockTelemetry } from "@/data/telemetry";

export const revalidate = 300;

export async function GET() {
  return NextResponse.json(mockTelemetry, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
