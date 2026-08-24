export function RingDivider() {
  return (
    <div role="separator" className="flex items-center gap-3.5 px-16">
      <div className="h-px flex-1 bg-border-light" />
      <div className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-adire">
        <div className="h-1.25 w-1.25 rounded-full bg-adire" />
      </div>
      <div className="h-px flex-1 bg-border-light" />
    </div>
  );
}
