import Image from "next/image";
import { MediaSlot } from "@/components/ui/MediaSlot";

/**
 * The deck's hardware strip, at the bottom of the page as it asks. Two
 * items with their pictures: the Smart Blackboard is removed by standing
 * instruction. The Spotty stand is the real product packshot.
 */
const HARDWARE: { name: string; line: string; accent: string; image: { src: string; alt: string } | null; placeholder: string }[] = [
  {
    name: "Virtual Science Lab tablet",
    line: "Full package including the device, [$150] per student per year.",
    accent: "#F5A623",
    image: null,
    placeholder: "hardware-tablet.png",
  },
  {
    name: "Spotty camera and book holder",
    line: "The stand that makes hands-free scanning work on a desk.",
    accent: "#8F87CF",
    image: {
      src: "/brand/products/spotty.png",
      alt: "The Spotty stand, a yellow giraffe-shaped tablet holder, with a tablet showing a shark swimming out of an open picture book beneath it",
    },
    placeholder: "",
  },
];

const BACKDROP =
  "radial-gradient(circle at 50% 55%, rgba(245,166,35,0.26) 0%, rgba(44,39,108,0.5) 45%, rgba(23,19,15,0.9) 100%)";

export function HardwareStrip() {
  return (
    <section className="px-8 py-16 md:px-16 md:py-24">
      <p className="mb-8 font-mono text-[11px] font-semibold uppercase tracking-widest text-danfo">Hardware</p>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {HARDWARE.map((item) => (
          <li key={item.name} className="flex flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[6px]">
              {item.image ? (
                <div className="absolute inset-0" style={{ background: BACKDROP }}>
                  <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 768px) 45vw, 90vw" className="object-contain p-[8%]" />
                </div>
              ) : (
                <MediaSlot className="h-full w-full" caption={`Placeholder: ${item.placeholder}`} />
              )}
            </div>
            <div className="flex items-start gap-4 pt-6">
              <span
                className="relative mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px]"
                style={{ borderColor: item.accent }}
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.accent }} />
              </span>
              <div>
                <h3 className="font-display text-[22px] leading-tight text-bone">{item.name}</h3>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-bone/75">{item.line}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
