export type TelemetryItem = {
  station: string;
  mission: string;
  status: string;
  signalTime: string;
};

export type TelemetryFeed = {
  updatedAt: string;
  items: TelemetryItem[];
};

export const mockTelemetryFeed: TelemetryFeed = {
  updatedAt: "2026-04-08T09:42:00Z",
  items: [
    {
      station: "Goldstone",
      mission: "Voyager 2",
      status: "Nominal",
      signalTime: "18m 12s",
    },
    {
      station: "Canberra",
      mission: "Europa Clipper",
      status: "Tracking",
      signalTime: "4m 56s",
    },
    {
      station: "Madrid",
      mission: "James Webb",
      status: "Locked",
      signalTime: "29m 08s",
    },
    {
      station: "DSS-14",
      mission: "Psyche",
      status: "Queued",
      signalTime: "7m 41s",
    },
  ],
};

export function normalizeTelemetryFeed(value: unknown): TelemetryFeed | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = "feed" in value ? (value as { feed?: unknown }).feed : value;

  if (!candidate || typeof candidate !== "object") {
    return null;
  }

  const feed = candidate as Partial<TelemetryFeed> & { items?: unknown };

  if (typeof feed.updatedAt !== "string" || !Array.isArray(feed.items)) {
    return null;
  }

  const items = feed.items
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const normalized = item as Partial<TelemetryItem>;

      if (
        typeof normalized.station !== "string" ||
        typeof normalized.mission !== "string" ||
        typeof normalized.status !== "string" ||
        typeof normalized.signalTime !== "string"
      ) {
        return null;
      }

      return {
        station: normalized.station,
        mission: normalized.mission,
        status: normalized.status,
        signalTime: normalized.signalTime,
      };
    })
    .filter((item): item is TelemetryItem => item !== null);

  if (!items.length) {
    return null;
  }

  return {
    updatedAt: feed.updatedAt,
    items,
  };
}
