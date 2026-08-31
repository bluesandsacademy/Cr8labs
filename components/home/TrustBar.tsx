// The site's own proof-bar figures, superseding the pitch-deck numbers this
// replaced: five stats instead of four, so the grid below runs to 5 columns.
export const STATS: { value: string; label: string }[] = [
  { value: "$20K+", label: "revenue generated" },
  { value: "10,000+", label: "users reached" },
  { value: "150+", label: "interactive simulations" },
  { value: "10+", label: "institutions deployed" },
  { value: "3", label: "states in Nigeria" },
];

/**
 * The arrival beat. On the home page this holds for a full viewport once the
 * dive is through, so it is set as a moment, not a strip: the trust line in
 * display type, numerals large.
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

      {/* One column on phones: "10,000+" at display size is wider than half
          a 390px screen and pushed the whole page into horizontal scroll. */}
      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 md:mt-14 lg:grid-cols-5">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex min-w-0 flex-col gap-2">
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
    </div>
  );
}
