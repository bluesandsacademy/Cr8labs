const STATS: { value: string; label: string }[] = [
  { value: "[100]+", label: "schools" },
  { value: "[20,000]+", label: "students" },
  { value: "[6]", label: "countries" },
  { value: "[250]+", label: "interactive experiences" },
];

export function TrustBar({ theme = "light" }: { theme?: "light" | "dark" }) {
  const isDark = theme === "dark";

  return (
    <div className={`px-8 py-11 md:px-16 ${isDark ? "" : "bg-bone"}`}>
      <p className={`mb-7 font-sans text-[13px] font-medium ${isDark ? "text-bone/70" : "text-muted"}`}>
        Built for Africa. Designed for the world. Running on technology we own.
      </p>
      <div className="flex flex-wrap gap-x-16 gap-y-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1.5">
            <div
              className={`font-mono text-[28px] font-bold md:text-[30px] ${isDark ? "text-bone" : "text-ink"}`}
            >
              {stat.value}
            </div>
            <div className={`text-[12px] tracking-wide ${isDark ? "text-bone/60" : "text-muted"}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
