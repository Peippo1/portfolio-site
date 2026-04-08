import "server-only";

import {
  mockTelemetryFeed,
  normalizeTelemetryCollection,
  normalizeTelemetryFeed,
  type TelemetryResponse,
} from "@/lib/telemetry";

const telemetrySourceLabel =
  process.env.TELEMETRY_SOURCE_LABEL?.trim() || "nasa-jpl";
const telemetrySourceUrl = process.env.TELEMETRY_SOURCE_URL?.trim() || "";

function buildTelemetryFeed(
  source: string,
  isLive: boolean,
  items: TelemetryResponse["items"],
  updatedAt = new Date().toISOString()
): TelemetryResponse {
  return {
    updatedAt,
    source,
    isLive,
    items,
  };
}

export async function fetchTelemetryFeed(): Promise<TelemetryResponse> {
  if (!telemetrySourceUrl) {
    return mockTelemetryFeed;
  }

  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), 3500);

  try {
    const response = await fetch(telemetrySourceUrl, {
      signal: abortController.signal,
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      throw new Error(`Telemetry source returned ${response.status}`);
    }

    const payload = (await response.json()) as unknown;
    const normalizedFeed = normalizeTelemetryFeed(payload);

    if (normalizedFeed) {
      return {
        ...normalizedFeed,
        source: telemetrySourceLabel,
        isLive: true,
      };
    }

    const items = normalizeTelemetryCollection(payload);

    if (!items) {
      throw new Error("Telemetry payload did not contain a normalized item list");
    }

    return buildTelemetryFeed(telemetrySourceLabel, true, items);
  } catch {
    return {
      ...mockTelemetryFeed,
      source: telemetrySourceUrl ? `${telemetrySourceLabel}:fallback` : "mock",
      isLive: false,
    };
  } finally {
    clearTimeout(timeout);
  }
}
