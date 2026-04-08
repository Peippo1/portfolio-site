export type TelemetryItem = {
  station: string;
  mission: string;
  status: "Two-way" | "Downlink" | "Uplink" | "Monitoring";
  signalTime: string;
};

export type TelemetryResponse = {
  updatedAt: string;
  source: string;
  isLive: boolean;
  items: TelemetryItem[];
};

export const mockTelemetry: TelemetryResponse = {
  updatedAt: "2026-04-08T18:42:00Z",
  source: "DSN-inspired telemetry",
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
  eyebrow: "Live telemetry",
  title: "A quiet systems view inspired by deep-space communications.",
  description:
    "A subtle signal layer built to make the portfolio feel live, precise, and a little more memorable.",
  fallback: "Telemetry temporarily unavailable.",
  sourceLabel: "Source",
  updatedLabel: "Updated",
};
