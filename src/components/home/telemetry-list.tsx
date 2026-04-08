import type { TelemetryResponse } from "@/data/telemetry";

type TelemetryListProps = {
  feed?: TelemetryResponse;
  loading?: boolean;
};

function TelemetryRowSkeleton() {
  return (
    <div className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline">
      <div className="space-y-2">
        <div className="h-3.5 w-24 rounded-full bg-black/5" />
        <div className="h-3.5 w-3/5 rounded-full bg-black/5" />
      </div>
      <div className="flex gap-3 sm:justify-end">
        <div className="h-3.5 w-16 rounded-full bg-black/5" />
        <div className="h-3.5 w-20 rounded-full bg-black/5" />
      </div>
    </div>
  );
}

export function TelemetryList({ feed, loading = false }: TelemetryListProps) {
  if (loading || !feed) {
    return (
      <div className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
        {Array.from({ length: 3 }).map((_, index) => (
          <TelemetryRowSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
      {feed.items.slice(0, 5).map((item) => (
        <article
          key={`${item.station}-${item.mission}`}
          className="grid gap-3 py-4 transition-colors duration-150 hover:bg-black/[0.012] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline"
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
            <span className="font-mono tabular-nums tracking-[0.08em]">
              {item.signalTime}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
