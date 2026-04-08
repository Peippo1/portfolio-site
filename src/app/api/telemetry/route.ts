import { NextResponse } from "next/server";
import { mockTelemetryFeed } from "@/lib/telemetry";

export async function GET() {
  return NextResponse.json(mockTelemetryFeed);
}
