/**
 * A number with its label. Unconfirmed figures arrive from the copy deck in
 * `[brackets]`; the bracketed part is coloured so it reads as provisional at
 * a glance, and anything after it (a plus, "percent") stays in the base
 * colour. The value is kept as one text node per part so tests can find the
 * bracketed figure exactly.
 */
export function StatChip({
  value,
  label,
  tone = "light",
}: {
  value: string;
  label: string;
  tone?: "light" | "dark";
}) {
  const match = value.match(/^(\[[^\]]+\])(.*)$/);
  const bracket = match ? match[1] : null;
  const rest = match ? match[2] : value;
  // A symbol suffix ("+") stays at numeral size; a word suffix (" percent")
  // drops to a smaller size so it neither wraps nor competes with the figure.
  const wordSuffix = /^\s+[a-z]/i.test(rest);
  const numeral = tone === "dark" ? "text-bone" : "text-ink";
  const highlight = tone === "dark" ? "text-laterite-tint" : "text-laterite-text";
  const caption = tone === "dark" ? "text-bone/60" : "text-muted";

  return (
    <div className="flex flex-col gap-1.5">
      <div className={`font-mono text-[28px] font-bold leading-none md:text-[34px] ${numeral}`}>
        {bracket && <span className={highlight}>{bracket}</span>}
        {wordSuffix ? <span className="text-[16px] font-semibold md:text-[18px]">{rest}</span> : rest}
      </div>
      <div className={`font-sans text-[13px] leading-snug ${caption}`}>{label}</div>
    </div>
  );
}
