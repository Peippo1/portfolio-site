"use client";

import { useEffect, useState } from "react";
import {
  mockTelemetryFeed,
  normalizeTelemetryFeed,
  type TelemetryFeed,
} from "@/lib/telemetry";

type TelemetryState = {
  status: "loading" | "success" | "fallback";
  feed: TelemetryFeed;
  note?: string;
};

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function TelemetrySweep() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 56"
      preserveAspectRatio="none"
      className="h-14 w-full"
    >
      <path
        d="M0 30 C 130 30, 190 18, 300 25 S 505 42, 620 28 S 820 11, 945 26 S 1110 40, 1200 24"
        fill="none"
        stroke="rgba(17, 17, 17, 0.08)"
        strokeWidth="1"
      />
      <path
        d="M0 30 C 130 30, 190 18, 300 25 S 505 42, 620 28 S 820 11, 945 26 S 1110 40, 1200 24"
        fill="none"
        stroke="rgba(17, 17, 17, 0.34)"
        strokeLinecap="round"
        strokeWidth="1.25"
        strokeDasharray="92 1180"
        className="motion-reduce:hidden motion-safe:animate-[telemetry-sweep_18s_linear_infinite]"
      />
    </svg>
  );
}

function TelemetrySkeleton() {
  return (
    <div className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline"
        >
          <div className="space-y-2">
            <div className="h-3.5 w-28 rounded-full bg-black/5" />
            <div className="h-3.5 w-3/4 rounded-full bg-black/5" />
          </div>
          <div className="flex gap-3 sm:justify-end">
            <div className="h-3.5 w-16 rounded-full bg-black/5" />
            <div className="h-3.5 w-20 rounded-full bg-black/5" />
          </div>
        </div>
      ))}
    </div>
  );
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
            feed: mockTelemetryFeed,
            note: "Live endpoint unavailable. Showing the local sweep.",
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
          <TelemetrySweep />
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
            {state.status === "loading" ? (
              <TelemetrySkeleton />
            ) : (
              <div className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
                {state.feed.items.slice(0, 5).map((item) => (
                  <article
                    key={`${item.station}-${item.mission}`}
                    className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text)]">
                        {item.station}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                        {item.mission}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs tracking-[0.14em] text-[var(--color-muted)] uppercase sm:justify-end">
                      <span>{item.status}</span>
                      <span>{item.signalTime}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
