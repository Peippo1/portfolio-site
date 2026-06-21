export function IconMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <path
        d="M12 2.8 20.2 7v10L12 21.2 3.8 17V7 2.8Z"
        className="fill-[var(--color-text)]"
        opacity="0.1"
      />
      <path
        d="M12 2.8 20.2 7 12 11.2 3.8 7 12 2.8Z"
        className="stroke-[var(--color-text)]"
        strokeWidth="1.1"
      />
      <path
        d="M3.8 7v10L12 21.2 20.2 17V7"
        className="stroke-[var(--color-text)]"
        strokeWidth="1.1"
      />
      <path
        d="M12 11.2v10"
        className="stroke-[var(--color-text)]"
        strokeWidth="1.1"
      />
      <path
        d="M7.8 9.2v5.1M16.2 9.2v5.1"
        className="stroke-[var(--color-text)]"
        strokeWidth="1.1"
        opacity="0.55"
      />
    </svg>
  );
}
