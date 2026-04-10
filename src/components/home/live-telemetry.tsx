"use client";

import { useEffect, useState } from "react";
import { mockTelemetry, liveTelemetryCopy, type TelemetryResponse } from "@/data/telemetry";
import { normalizeTelemetryFeed } from "@/lib/telemetry";
import { TelemetryLine } from "@/components/home/telemetry-line";
import { TelemetryList } from "@/components/home/telemetry-list";

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
                {state.status === "success" ? "Signal nominal" : "Fallback feed"}
              </p>
            </div>

            <p className="max-w-prose text-sm leading-7 text-[var(--color-muted)]">
              {state.status === "success"
                ? `Live telemetry normalized from ${state.feed.source}.`
                : state.note}
            </p>

            <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
              {liveTelemetryCopy.sourceLabel} · {state.feed.source}
            </p>

            <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
              {liveTelemetryCopy.updatedLabel} {updatedLabel}
            </p>
          </div>

          <div className="min-w-0">
            <TelemetryList feed={state.feed} />
          </div>
        </div>
      </div>
    </section>
  );
}
