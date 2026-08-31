const PARTNERS = ["LASRIC", "NITDA", "NTI"];

/**
 * Its own band, not a footnote inside another section — the credibility
 * signal a funder scans for first gets the same visual weight Whereby,
 * Voiceflow and Loom give their own "trusted by" rows. No logo files exist
 * for these partners, so each name is set as its own bold wordmark.
 */
export function BackedBy() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-white py-10 sm:py-12">
      <div className="page-frame text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
          Backed and deployed with
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
          {PARTNERS.map((partner) => (
            <span
              key={partner}
              className="font-display text-xl font-bold tracking-tight text-ink/80 transition-colors hover:text-ink sm:text-2xl"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
