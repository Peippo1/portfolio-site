import type {
  TelemetryItem,
  TelemetryResponse,
} from "@/data/telemetry";

type TelemetryShape = {
  updatedAt?: unknown;
  source?: unknown;
  isLive?: unknown;
  items?: unknown;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeTelemetryItem(value: unknown): TelemetryItem | null {
  if (!isObject(value)) {
    return null;
  }

  const statusValues: TelemetryItem["status"][] = [
    "Two-way",
    "Downlink",
    "Uplink",
    "Monitoring",
  ];

  if (
    typeof value.station !== "string" ||
    typeof value.mission !== "string" ||
    typeof value.status !== "string" ||
    typeof value.signalTime !== "string" ||
    !statusValues.includes(value.status as TelemetryItem["status"])
  ) {
    return null;
  }

  return {
    station: value.station,
    mission: value.mission,
    status: value.status as TelemetryItem["status"],
    signalTime: value.signalTime,
  };
}

export function normalizeTelemetryCollection(value: unknown): TelemetryItem[] | null {
  if (Array.isArray(value)) {
    const items = value.map(normalizeTelemetryItem).filter(Boolean);
    return items.length ? (items as TelemetryItem[]) : null;
  }

  if (!isObject(value)) {
    return null;
  }

  const nestedCandidates = [
    value.items,
    value.data,
    isObject(value.data) ? value.data.items : null,
    value.feed,
    isObject(value.feed) ? value.feed.items : null,
    value.results,
  ];

  for (const candidate of nestedCandidates) {
    if (Array.isArray(candidate)) {
      const items = candidate.map(normalizeTelemetryItem).filter(Boolean);
      if (items.length) {
        return items as TelemetryItem[];
      }
    }
  }

  return null;
}

export function normalizeTelemetryFeed(value: unknown): TelemetryResponse | null {
  if (!isObject(value)) {
    return null;
  }

  const candidate = "feed" in value ? value.feed : value;
  const normalized = isObject(candidate) ? (candidate as TelemetryShape) : null;

  if (
    !normalized ||
    typeof normalized.updatedAt !== "string" ||
    typeof normalized.source !== "string" ||
    typeof normalized.isLive !== "boolean"
  ) {
    return null;
  }

  const items = Array.isArray(normalized.items)
    ? normalized.items.map(normalizeTelemetryItem).filter(Boolean)
    : [];

  if (!items.length) {
    return null;
  }

  return {
    updatedAt: normalized.updatedAt,
    source: normalized.source,
    isLive: normalized.isLive,
    items: items as TelemetryItem[],
  };
}
