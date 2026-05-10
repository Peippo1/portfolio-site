import "server-only";

import { mockTelemetry, type TelemetryPosition, type TelemetryResponse } from "@/data/telemetry";

const horizonsEndpoint = "https://ssd.jpl.nasa.gov/api/horizons.api";
const horizonsRequestTimeoutMs = 2500;
const horizonsRequestStaggerMs = 180;

const horizonsTargets = [
  { mission: "Voyager 2", command: "-32" },
  { mission: "Mars Odyssey", command: "-53" },
  { mission: "Psyche", command: "-255" },
  { mission: "Europa Clipper", command: "-159" },
] as const;

const referenceBodies = [{ name: "Earth", command: "399" }] as const;

type HorizonsVector = {
  command: string;
  position: TelemetryPosition;
};

type HorizonsTarget = {
  command: string;
  mission?: TelemetryResponse["items"][number]["mission"];
  referenceBody?: "Earth";
};

type HorizonsPayload = {
  result?: unknown;
  signature?: {
    source?: unknown;
    version?: unknown;
  };
};

function formatHorizonsDate(value: Date) {
  const month = value.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });

  return `${value.getUTCFullYear()}-${month}-${String(value.getUTCDate()).padStart(2, "0")}`;
}

function buildHorizonsUrl(command: string, startDate: string, stopDate: string) {
  const params = new URLSearchParams({
    format: "json",
    COMMAND: `'${command}'`,
    OBJ_DATA: "NO",
    MAKE_EPHEM: "YES",
    EPHEM_TYPE: "VECTORS",
    CENTER: "'500@10'",
    START_TIME: `'${startDate}'`,
    STOP_TIME: `'${stopDate}'`,
    STEP_SIZE: "'1 d'",
    VEC_TABLE: "'2'",
    OUT_UNITS: "'AU-D'",
    CSV_FORMAT: "YES",
  });

  return `${horizonsEndpoint}?${params.toString()}`;
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function abortSignalAfter(ms: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);

  return {
    signal: controller.signal,
    cancel: () => clearTimeout(timeout),
  };
}

function parseHorizonsVector(payload: HorizonsPayload): TelemetryPosition | null {
  if (
    typeof payload.result !== "string" ||
    typeof payload.signature?.source !== "string" ||
    !payload.signature.source.includes("NASA/JPL Horizons API")
  ) {
    return null;
  }

  const ephemeris = payload.result.match(/\$\$SOE\s*([\s\S]*?)\s*\$\$EOE/);
  const firstVectorLine = ephemeris?.[1]
    ?.split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0);

  if (!firstVectorLine) {
    return null;
  }

  const columns = firstVectorLine.split(",").map((column) => column.trim());
  const [x, y, z] = columns.slice(2, 5).map(Number);

  if (![x, y, z].every(Number.isFinite)) {
    return null;
  }

  return {
    x,
    y,
    z,
    rangeAu: Math.hypot(x, y, z),
  };
}

async function fetchHorizonsVector(
  command: string,
  startDate: string,
  stopDate: string
): Promise<HorizonsVector> {
  const timeout = abortSignalAfter(horizonsRequestTimeoutMs);

  try {
    const response = await fetch(buildHorizonsUrl(command, startDate, stopDate), {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 3600,
      },
      signal: timeout.signal,
    });

    if (!response.ok) {
      throw new Error(`Horizons returned ${response.status}`);
    }

    const payload = (await response.json()) as HorizonsPayload;
    const position = parseHorizonsVector(payload);

    if (!position) {
      throw new Error("Horizons vector payload was not parseable");
    }

    return {
      command,
      position,
    };
  } finally {
    timeout.cancel();
  }
}

function withMissionPositions(vectors: HorizonsVector[]): TelemetryResponse["items"] {
  return mockTelemetry.items.map((item) => {
    const target = horizonsTargets.find((candidate) => candidate.mission === item.mission);
    const vector = target
      ? vectors.find((candidate) => candidate.command === target.command)
      : null;

    return vector
      ? {
          ...item,
          position: vector.position,
        }
      : item;
  });
}

async function fetchHorizonsVectors(
  targets: HorizonsTarget[],
  startDate: string,
  stopDate: string
) {
  const settled = await Promise.allSettled(
    targets.map(async (target, index) => {
      if (index > 0) {
        await delay(index * horizonsRequestStaggerMs);
      }

      return fetchHorizonsVector(target.command, startDate, stopDate);
    })
  );

  return settled.flatMap((result) =>
    result.status === "fulfilled" ? [result.value] : []
  );
}

export async function fetchTelemetryFeed(): Promise<TelemetryResponse> {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setUTCDate(now.getUTCDate() + 1);

  const startDate = formatHorizonsDate(now);
  const stopDate = formatHorizonsDate(tomorrow);

  /*
   * Data source notes, current as of May 2026:
   * - JPL Horizons API: official public JPL SSD API for vectors and ephemerides.
   *   It does not require an api.nasa.gov key for these GET queries.
   * - NASA Open APIs: useful for APOD, EPIC, Mars rover photos, DONKI, NeoWs,
   *   and similar datasets, but they do not provide this mission-position feed.
   * - DSN Now: official live DSN status web app, but no stable documented JSON
   *   API is used here; DSN communication status in this portfolio remains simulated.
   */
  const targets: HorizonsTarget[] = [...horizonsTargets, ...referenceBodies];
  const vectors = await fetchHorizonsVectors(targets, startDate, stopDate);
  const positionedMissionCount = horizonsTargets.filter((target) =>
    vectors.some((vector) => vector.command === target.command)
  ).length;
  const earth = vectors.find((vector) => vector.command === "399");

  if (positionedMissionCount > 0) {
    return {
      ...mockTelemetry,
      updatedAt: now.toISOString(),
      source:
        positionedMissionCount === horizonsTargets.length && earth
          ? "Live JPL Horizons data"
          : "Live JPL Horizons data (partial)",
      isLive: true,
      items: withMissionPositions(vectors),
      ...(earth
        ? {
            referenceBodies: [
              {
                name: "Earth" as const,
                position: earth.position,
              },
            ],
          }
        : {}),
    };
  }

  return {
    ...mockTelemetry,
    source: "Simulated DSN-inspired snapshot",
    isLive: false,
  };
}
