import Image from "next/image";
import { Rocket, Gamepad2, Tablet, WifiOff } from "lucide-react";

const PROOF_LIST = [
  { text: "Immersive AR and VR experiences built and shipped, not prototyped", icon: Rocket, tint: "bg-danfo/25 text-laterite-text" },
  { text: "Gamified content and 3D simulations across four subject areas", icon: Gamepad2, tint: "bg-adire/10 text-adire" },
  { text: "Tablet and headset deployments in institutions across three states", icon: Tablet, tint: "bg-laterite/10 text-laterite-text" },
  { text: "Offline and low connectivity builds that run with no network at all", icon: WifiOff, tint: "bg-adire-light/15 text-adire" },
];

/**
 * Ported from bluesandsk12's challenge.jsx: a header band (copy | a photo
 * card in place of their lead stat), then a row of tinted-icon proof cards
 * (their "supporting stats" pattern) below.
 */
export function ProofSection() {
  return (
    <section className="relative section-y overflow-hidden" style={{ background: "#F6F8FB" }}>
      <div className="relative page-frame">
        <div className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70 sm:text-sm">
              Traction
            </span>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
              We have already proven the model.
            </h2>
            <p className="mt-4 max-w-md font-sans text-lg font-semibold text-body">
              Education was the proving ground. Since 2025, we have shipped immersive AR and VR into
              real classrooms, on real devices, over real networks. The same stack now moves into
              culture, publishing, and brand.
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.8rem] border-4 border-adire/10 shadow-[0_12px_0_rgba(23,19,15,0.08)]">
            <Image
              src="/brand/proof-classroom.png"
              alt="Three students sharing a tablet at a wooden desk in a real classroom, laughing together, with a chalkboard and warm window light behind them"
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF_LIST.map((point) => (
            <div
              key={point.text}
              className="flex items-center gap-4 rounded-2xl border border-adire/5 bg-white px-5 py-4 shadow-sm"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${point.tint}`}>
                <point.icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <p className="font-sans text-sm font-semibold leading-snug text-body">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
