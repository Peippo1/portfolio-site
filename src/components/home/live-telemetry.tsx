"use client";

import { useEffect, useState } from "react";
import {
  mockTelemetryFeed,
  type TelemetryResponse,
} from "@/lib/telemetry";
import { TelemetryLine } from "@/components/home/telemetry-line";
import { TelemetryList } from "@/components/home/telemetry-list";

type TelemetryState = {
  status: "loading" | "success" | "fallback";
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
    status: "loading",
    feed: mockTelemetryFeed,
  });

  useEffect(() => {
    let active = true;

    async function loadTelemetry() {
      try {
        const response = await fetch("/api/telemetry", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Telemetry route unavailable");
        }

        const data = await response.json();
        if (!data || typeof data !== "object" || !("items" in data)) {
          throw new Error("Telemetry payload invalid");
        }

        if (active) {
          setState({
            status: "success",
            feed: data as TelemetryResponse,
          });
        }
      } catch {
        if (active) {
          setState({
            status: "fallback",
            feed: mockTelemetryFeed,
            note: "Telemetry temporarily unavailable.",
          });
        }
      }
    }

    void loadTelemetry();

    return () => {
      active = false;
    };
  }, []);

  const updatedLabel =
    state.status === "loading"
      ? "Fetching current sweep"
      : formatUpdatedAt(state.feed.updatedAt);

  return (
    <section
      aria-labelledby="live-telemetry"
      className="mt-14 border-t border-[var(--color-border)] pt-7 sm:mt-16 sm:pt-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase">
            Live telemetry
          </p>
          <h2
            id="live-telemetry"
            className="font-editorial mt-3 text-[1.85rem] leading-tight sm:text-[2.15rem]"
          >
            A quiet systems view inspired by deep-space links.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)] sm:text-right">
          A restrained readout of stations, missions, and signal delay. It
          stays secondary to the portfolio content and can switch between mock
          and live data without a visual change.
        </p>
      </div>

      <div
        className="mt-5 overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]"
        aria-busy={state.status === "loading"}
        aria-live="polite"
      >
        <div className="border-b border-[var(--color-border)] px-4 pt-2 sm:px-6">
          <TelemetryLine loading={state.status === "loading"} />
        </div>

        <div className="grid gap-6 px-4 py-5 sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  state.status === "success"
                    ? "bg-[var(--color-text)]/60"
                    : "bg-[var(--color-text)]/30"
                }`}
              />
              <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                {state.status === "loading"
                  ? "Loading sweep"
                  : state.status === "success"
                    ? "Signal nominal"
                    : "Fallback feed"}
              </p>
            </div>

            <p className="max-w-prose text-sm leading-7 text-[var(--color-muted)]">
              {state.status === "loading"
                ? "Reading the latest signal sweep."
                : state.status === "success"
                  ? `Normalized telemetry from ${state.feed.source}.`
                  : state.note}
            </p>

            <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
              {state.status === "loading"
                ? "Source pending"
                : `${state.feed.isLive ? "Live" : "Cached"} source · ${state.feed.source}`}
            </p>

            <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
              Updated {updatedLabel}
            </p>
          </div>

          <div className="min-w-0">
            <TelemetryList
              loading={state.status === "loading"}
              feed={state.status === "loading" ? undefined : state.feed}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
