/**
 * The deck's hardware strip, at the bottom of the page as it asks. Two
 * items: the Smart Blackboard is removed by standing instruction.
 */
const HARDWARE: { name: string; line: string }[] = [
  {
    name: "Virtual Science Lab tablet",
    line: "Full package including the device, [$150] per student per year.",
  },
  {
    name: "Spotty camera and book holder",
    line: "The stand that makes hands-free scanning work on a desk.",
  },
];

export function HardwareStrip() {
  return (
    <section className="px-8 py-16 md:px-16 md:py-24">
      <p className="mb-8 font-mono text-[11px] font-semibold uppercase tracking-widest text-danfo">Hardware</p>
      <ul className="grid grid-cols-1 border-l border-t border-bone/12 md:grid-cols-2">
        {HARDWARE.map((item, i) => (
          <li key={item.name} className="border-b border-r border-bone/12 p-7 md:p-9">
            <span
              className="relative mb-5 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px]"
              style={{ borderColor: i === 0 ? "#F5A623" : "#8F87CF" }}
              aria-hidden="true"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: i === 0 ? "#F5A623" : "#8F87CF" }} />
            </span>
            <h3 className="font-display text-[22px] leading-tight text-bone">{item.name}</h3>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-bone/75">{item.line}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
