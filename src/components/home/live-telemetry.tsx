"use client";

import { useEffect, useState } from "react";
import { mockTelemetry, liveTelemetryCopy, type TelemetryResponse } from "@/data/telemetry";
import { normalizeTelemetryFeed } from "@/lib/telemetry";
import { TelemetryLine } from "@/components/home/telemetry-line";
import { TelemetryList } from "@/components/home/telemetry-list";
import { TelemetryOrbit } from "@/components/home/telemetry-orbit";

type TelemetryState = {
  status: "success" | "fallback";
  feed: TelemetryResponse;
  note?: string;
};

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function LiveTelemetry() {
  const [state, setState] = useState<TelemetryState>({
    status: "success",
    feed: mockTelemetry,
  });

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, 2500);

    async function loadTelemetry() {
      try {
        const response = await fetch("/api/telemetry", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Telemetry route unavailable");
        }

        const data = await response.json();
        const feed = normalizeTelemetryFeed(data);

        if (!feed) {
          throw new Error("Telemetry payload invalid");
        }

        if (active) {
          setState({
            status: "success",
            feed,
          });
        }
      } catch {
        if (active) {
          setState({
            status: "fallback",
            feed: mockTelemetry,
            note: liveTelemetryCopy.fallback,
          });
        }
      }
    }

    void loadTelemetry();

    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, []);

  const updatedLabel = formatUpdatedAt(state.feed.updatedAt);
  const hasPartialHorizonsData = state.feed.source.includes("(partial)");
  const sourceDescription = state.feed.isLive
    ? hasPartialHorizonsData
      ? "Live JPL Horizons data resolved for some mission positions. DSN station status remains simulated."
      : "Live JPL Horizons data provides the orbital positions. DSN station status remains simulated."
    : "Simulated DSN-inspired snapshot using fallback mission positions and communication status.";

  return (
    <section
      aria-labelledby="live-telemetry"
      className="mt-14 border-t border-[var(--color-border)] pt-7 sm:mt-16 sm:pt-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
            {liveTelemetryCopy.eyebrow}
          </p>
          <h2
            id="live-telemetry"
            className="font-editorial mt-3 text-[1.85rem] leading-tight sm:text-[2.15rem]"
          >
            {liveTelemetryCopy.title}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)] sm:text-right">
          {liveTelemetryCopy.description}
        </p>
      </div>

      <div
        className="mt-5 overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]"
        aria-live="polite"
      >
        <div className="border-b border-[var(--color-border)] px-4 pt-2 sm:px-6">
          <TelemetryLine loading={false} />
        </div>

        <div className="grid gap-6 px-4 py-5 sm:px-6 sm:py-6 lg:grid-cols-[minmax(18rem,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  state.feed.isLive
                    ? "bg-[var(--color-text)]/60"
                    : "bg-[var(--color-text)]/30"
                }`}
              />
              <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                {state.feed.isLive
                  ? "Live JPL Horizons data"
                  : "Simulated DSN-inspired snapshot"}
              </p>
            </div>

            <p className="max-w-prose text-sm leading-7 text-[var(--color-muted)]">
              {state.status === "fallback" && state.note
                ? state.note
                : sourceDescription}
            </p>

            <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
              {liveTelemetryCopy.sourceLabel} · {state.feed.source}
            </p>

            <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
              {liveTelemetryCopy.updatedLabel} {updatedLabel}
            </p>

            <p className="max-w-prose border-t border-[var(--color-border)] pt-4 text-xs leading-6 tracking-[0.08em] text-[var(--color-muted)] uppercase">
              {state.feed.isLive
                ? "Available mission positions use official JPL Horizons vectors. DSN signal lines are illustrative."
                : "DSN-inspired system view. Marker positions and signal lines are illustrative, not live NASA DSN coordinates."}
            </p>
          </div>

          <div className="min-w-0 space-y-5">
            <TelemetryOrbit feed={state.feed} />
            <TelemetryList feed={state.feed} />
          </div>
        </div>
      </div>
    </section>
  );
}
