type TelemetryLineProps = {
  className?: string;
  loading?: boolean;
};

export function TelemetryLine({
  className = "",
  loading = false,
}: TelemetryLineProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 58"
      preserveAspectRatio="none"
      className={`h-14 w-full ${className}`.trim()}
    >
      <path
        d="M0 31 C 120 31, 190 20, 305 25 S 515 44, 630 29 S 820 13, 948 27 S 1115 40, 1200 24"
        fill="none"
        stroke="rgba(17, 17, 17, 0.1)"
        strokeWidth="1"
      />
      <path
        d="M0 31 C 120 31, 190 20, 305 25 S 515 44, 630 29 S 820 13, 948 27 S 1115 40, 1200 24"
        fill="none"
        stroke={loading ? "rgba(17, 17, 17, 0.16)" : "rgba(17, 17, 17, 0.34)"}
        strokeLinecap="round"
        strokeWidth="1.25"
        strokeDasharray="88 1192"
        className={
          loading
            ? ""
            : "motion-reduce:hidden motion-safe:animate-[telemetry-sweep_20s_linear_infinite]"
        }
      />
      <circle
        cx="320"
        cy="24"
        r="2.75"
        fill={loading ? "rgba(17, 17, 17, 0.28)" : "rgba(17, 17, 17, 0.62)"}
        className={
          loading
            ? ""
            : "motion-reduce:hidden motion-safe:animate-[telemetry-node_20s_ease-in-out_infinite]"
        }
      />
      <circle
        cx="740"
        cy="28"
        r="1.75"
        fill={loading ? "rgba(17, 17, 17, 0.22)" : "rgba(17, 17, 17, 0.38)"}
        className={
          loading
            ? ""
            : "motion-reduce:hidden motion-safe:animate-[telemetry-node_20s_ease-in-out_infinite] [animation-delay:7s]"
        }
      />
    </svg>
  );
}
