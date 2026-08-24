/**
 * Reserved slot for a not-yet-generated Envato image. Renders the brand's dark
 * glow treatment plus a visible mono caption describing what belongs here, so
 * layouts are judgeable before the real asset lands and the swap is a
 * one-line change per call site.
 */
export function MediaSlot({ caption, className = "" }: { caption: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-adire-dark ${className}`}>
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(245,166,35,0.28)_0%,rgba(44,39,108,0.55)_48%,rgba(23,19,15,0.95)_100%)]"
        aria-hidden="true"
      />
      <p className="absolute inset-x-5 bottom-5 text-center font-mono text-[10px] font-medium leading-relaxed text-adire-caption">
        {caption}
      </p>
    </div>
  );
}
