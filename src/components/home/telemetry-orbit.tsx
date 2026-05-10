import type { TelemetryPosition, TelemetryResponse } from "@/data/telemetry";

type MissionVisual = {
  orbit: string;
  path: string;
  point: VisualPoint;
  labelOffset: VisualPoint;
};

type VisualPoint = {
  x: number;
  y: number;
};

const viewCenter: VisualPoint = {
  x: 286,
  y: 172,
};

const fallbackMissionVisuals: Record<string, MissionVisual> = {
  "Voyager 2": {
    orbit: "M70 160 C165 36 346 22 474 116 C548 170 548 246 452 300 C318 374 132 328 70 160Z",
    path: "M330 82 L424 52",
    point: { x: 424, y: 52 },
    labelOffset: { x: -38, y: -14 },
  },
  "Mars Odyssey": {
    orbit: "M145 160 C196 82 310 74 385 136 C446 187 412 260 314 286 C212 313 115 245 145 160Z",
    path: "M285 154 L372 129",
    point: { x: 372, y: 129 },
    labelOffset: { x: 14, y: 3 },
  },
  Psyche: {
    orbit: "M114 163 C176 56 340 47 438 122 C522 186 480 291 342 318 C205 346 62 252 114 163Z",
    path: "M294 173 L447 214",
    point: { x: 447, y: 214 },
    labelOffset: { x: 15, y: 6 },
  },
  "Europa Clipper": {
    orbit: "M168 169 C224 116 305 104 361 145 C416 185 397 248 318 266 C240 283 156 231 168 169Z",
    path: "M286 167 L238 244",
    point: { x: 238, y: 244 },
    labelOffset: { x: -148, y: 12 },
  },
};

const statusDash: Record<TelemetryResponse["items"][number]["status"], string> = {
  "Two-way": "1 0",
  Downlink: "4 5",
  Uplink: "2 4",
  Monitoring: "1 6",
};

type TelemetryOrbitProps = {
  feed: TelemetryResponse;
};

function projectPosition(
  position: TelemetryPosition | undefined,
  maxRangeAu: number
): VisualPoint | null {
  if (!position || maxRangeAu <= 0) {
    return null;
  }

  const angle = Math.atan2(position.y, position.x);
  const normalizedRange =
    Math.log10(position.rangeAu + 1) / Math.log10(maxRangeAu + 1);
  const radius = 34 + normalizedRange * 126;

  return {
    x: viewCenter.x + Math.cos(angle) * radius,
    y: viewCenter.y + Math.sin(angle) * radius,
  };
}

export function TelemetryOrbit({ feed }: TelemetryOrbitProps) {
  const hasPartialHorizonsData = feed.source.includes("(partial)");
  const maxRangeAu = Math.max(
    ...feed.items.map((item) => item.position?.rangeAu ?? 0),
    ...(feed.referenceBodies ?? []).map((body) => body.position.rangeAu),
    0
  );
  const earthPosition = projectPosition(
    feed.referenceBodies?.find((body) => body.name === "Earth")?.position,
    maxRangeAu
  );
  const earthPoint = earthPosition ?? viewCenter;
  const items = feed.items.filter((item) => fallbackMissionVisuals[item.mission]);

  return (
    <figure className="relative min-h-[22rem] overflow-hidden border border-[var(--color-border)] bg-[rgba(255,255,255,0.32)]">
      <svg
        aria-labelledby="telemetry-orbit-title telemetry-orbit-description"
        className="h-full min-h-[22rem] w-full"
        role="img"
        viewBox="0 0 560 360"
      >
        <title id="telemetry-orbit-title">
          DSN-inspired mission orbital map
        </title>
        <desc id="telemetry-orbit-description">
          Minimal monochrome orbital visual for Earth, a deep-space centre point,
          and mission markers for Voyager 2, Mars Odyssey, Psyche, and Europa
          Clipper. Markers use JPL Horizons positions when available.
        </desc>

        <rect width="560" height="360" fill="transparent" />
        <path
          d="M48 44H512M48 116H512M48 188H512M48 260H512M48 332H512M86 28V332M178 28V332M270 28V332M362 28V332M454 28V332"
          fill="none"
          stroke="rgba(17, 17, 17, 0.035)"
          strokeWidth="1"
        />

        <g opacity="0.9">
          <circle
            cx={earthPoint.x}
            cy={earthPoint.y}
            r="18"
            fill="rgba(17, 17, 17, 0.06)"
            stroke="rgba(17, 17, 17, 0.42)"
            strokeWidth="1"
          />
          <path
            d={`M${earthPoint.x - 16} ${earthPoint.y}H${earthPoint.x + 16}M${earthPoint.x} ${earthPoint.y - 16}V${earthPoint.y + 16}`}
            stroke="rgba(17, 17, 17, 0.22)"
            strokeWidth="1"
          />
          <text
            x={earthPoint.x}
            y={earthPoint.y + 40}
            fill="rgba(17, 17, 17, 0.62)"
            fontSize="10"
            letterSpacing="1.6"
            textAnchor="middle"
          >
            EARTH
          </text>
        </g>

        <g>
          <circle
            cx={viewCenter.x}
            cy={viewCenter.y}
            r="4"
            fill="rgba(17, 17, 17, 0.72)"
            className="motion-safe:animate-[telemetry-pulse_5s_ease-in-out_infinite]"
          />
          <circle
            cx={viewCenter.x}
            cy={viewCenter.y}
            r="8"
            fill="none"
            stroke="rgba(17, 17, 17, 0.16)"
            strokeWidth="1"
          />
        </g>

        <g>
          <circle
            cx="104"
            cy="62"
            r="7"
            fill="rgba(17, 17, 17, 0.08)"
            stroke="rgba(17, 17, 17, 0.34)"
            strokeWidth="1"
          />
          <path
            d="M104 50V74M92 62H116"
            stroke="rgba(17, 17, 17, 0.18)"
            strokeWidth="1"
          />
          <text
            x="126"
            y="66"
            fill="rgba(17, 17, 17, 0.5)"
            fontSize="10"
            letterSpacing="1.5"
          >
            DEEP SPACE CENTRE
          </text>
        </g>

        {items.map((item) => {
          const fallback = fallbackMissionVisuals[item.mission];
          const projected = projectPosition(item.position, maxRangeAu);
          const point = projected ?? fallback.point;
          const path = projected
            ? `M${viewCenter.x} ${viewCenter.y} L${point.x} ${point.y}`
            : fallback.path;

          return (
            <g key={item.mission}>
              <path
                d={fallback.orbit}
                fill="none"
                stroke="rgba(17, 17, 17, 0.16)"
                strokeWidth="1"
              />
              <path
                d={path}
                fill="none"
                stroke="rgba(17, 17, 17, 0.2)"
                strokeDasharray={statusDash[item.status]}
                strokeLinecap="round"
                strokeWidth="1"
                className="motion-safe:animate-[telemetry-signal_8s_linear_infinite]"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="4.5"
                fill="rgba(17, 17, 17, 0.72)"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="9"
                fill="none"
                stroke="rgba(17, 17, 17, 0.15)"
                strokeWidth="1"
              />
              <text
                x={point.x + fallback.labelOffset.x}
                y={point.y + fallback.labelOffset.y}
                fill="rgba(17, 17, 17, 0.62)"
                fontSize="10"
                letterSpacing="1.4"
              >
                {item.mission.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-border)] bg-[rgba(248,246,241,0.78)] px-4 py-3 text-[0.68rem] tracking-[0.16em] text-[var(--color-muted)] uppercase backdrop-blur">
        <span>{feed.isLive ? "Live JPL Horizons data" : "Simulated DSN-inspired snapshot"}</span>
        <span>
          {feed.isLive
            ? hasPartialHorizonsData
              ? "Partial vectors"
              : "Heliocentric vectors"
            : "Mock fallback"}
        </span>
      </figcaption>
    </figure>
  );
}
