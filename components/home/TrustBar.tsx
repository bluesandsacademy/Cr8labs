const STATS: { value: string; label: string }[] = [
  { value: "[100]+", label: "schools" },
  { value: "[20,000]+", label: "students" },
  { value: "[6]", label: "countries" },
  { value: "[250]+", label: "interactive experiences" },
];

/**
 * The arrival beat. On the home page this holds for a full viewport once the
 * dive is through, so it is set as a moment, not a strip: the trust line in
 * display type, numerals large. Stats stay bracketed until real figures are
 * supplied; the partner line is bracketed too, since each name needs
 * permission on file before it can be shown.
 */
export function TrustBar({ theme = "light" }: { theme?: "light" | "dark" }) {
  const isDark = theme === "dark";

  return (
    <div className={`px-8 py-11 md:px-16 ${isDark ? "" : "bg-bone"}`}>
      <div className="mb-6 flex items-center gap-3">
        <span
          className={`relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-[1.5px] ${
            isDark ? "border-danfo" : "border-adire"
          }`}
          aria-hidden="true"
        >
          <span className={`h-1 w-1 rounded-full ${isDark ? "bg-danfo" : "bg-adire"}`} />
        </span>
        <span className={`h-px w-16 ${isDark ? "bg-bone/25" : "bg-border"}`} aria-hidden="true" />
      </div>

      <p
        className={`max-w-200 font-display text-[26px] leading-[1.15] md:text-[38px] ${
          isDark ? "text-bone" : "text-ink"
        }`}
      >
        Built for Africa. Designed for the world. Running on technology we own.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-8 md:mt-14 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2">
            <div
              className={`font-mono text-[36px] font-bold leading-none md:text-[52px] ${
                isDark ? "text-bone" : "text-ink"
              }`}
            >
              {stat.value}
            </div>
            <div
              className={`font-sans text-[13px] tracking-wide ${isDark ? "text-bone/60" : "text-muted"}`}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <p
        className={`mt-10 font-mono text-[11px] uppercase tracking-widest md:mt-14 ${
          isDark ? "text-bone/50" : "text-muted"
        }`}
      >
        Working with [LASRIC, NITDA, NTI, CcHUB, ReLearn].
      </p>
    </div>
  );
}
