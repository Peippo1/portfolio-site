import type { ReactNode } from "react";

type SurfaceProps = {
  children: ReactNode;
  className?: string;
};

export function Surface({ children, className = "" }: SurfaceProps) {
  return (
    <div
      className={`rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)] backdrop-blur-sm ${className}`.trim()}
    >
      {children}
    </div>
  );
}
