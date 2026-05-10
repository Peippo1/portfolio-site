export type TelemetryItem = {
  station: string;
  mission: string;
  status: "Two-way" | "Downlink" | "Uplink" | "Monitoring";
  signalTime: string;
  position?: TelemetryPosition;
};

export type TelemetryPosition = {
  x: number;
  y: number;
  z: number;
  rangeAu: number;
};

export type TelemetryReferenceBody = {
  name: "Earth";
  position: TelemetryPosition;
};

export type TelemetryResponse = {
  updatedAt: string;
  source: string;
  isLive: boolean;
  items: TelemetryItem[];
  referenceBodies?: TelemetryReferenceBody[];
};

export const mockTelemetry: TelemetryResponse = {
  updatedAt: "2026-04-08T18:42:00Z",
  source: "Simulated DSN-inspired snapshot",
  isLive: false,
  items: [
    {
      station: "Canberra",
      mission: "Voyager 2",
      status: "Two-way",
      signalTime: "18m 42s",
    },
    {
      station: "Madrid",
      mission: "Mars Odyssey",
      status: "Downlink",
      signalTime: "07m 12s",
    },
    {
      station: "Goldstone",
      mission: "Psyche",
      status: "Uplink",
      signalTime: "12m 09s",
    },
    {
      station: "Canberra",
      mission: "Europa Clipper",
      status: "Monitoring",
      signalTime: "28m 31s",
    },
  ],
};

export const liveTelemetryCopy = {
  eyebrow: "DSN-inspired systems",
  title: "A mission-position layer for a systems-led portfolio.",
  description:
    "A minimal mission-operations visual backed by JPL Horizons when available. DSN communication status remains simulated unless a reliable DSN feed is implemented.",
  fallback: "Telemetry temporarily unavailable. Showing the mock DSN-inspired snapshot instead.",
  sourceLabel: "Source",
  updatedLabel: "Updated",
};
