import Image from "next/image";
import Link from "next/link";
import { RingDivider } from "@/components/ui/RingDivider";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Platform",
    links: [
      { label: "Platform overview", href: "/platform" },
      { label: "Architecture", href: "/platform/architecture" },
      { label: "Offline and low bandwidth", href: "/platform/offline" },
      { label: "Security and data protection", href: "/platform/security" },
      { label: "Developers", href: "/platform/developers" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "CR8LAB Books", href: "/products/books" },
      { label: "AR", href: "/products/ar" },
      { label: "VR", href: "/products/vr" },
      { label: "Labs", href: "/products/labs" },
      { label: "AI", href: "/products/ai" },
      { label: "Studio", href: "/products/studio" },
      { label: "Creator", href: "/products/creator" },
      { label: "Library", href: "/products/library" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Studio", href: "/studio" },
      { label: "Work", href: "/work" },
      { label: "Labs", href: "/labs" },
      { label: "Research", href: "/research" },
      { label: "Community", href: "/community" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    heading: "Get in touch",
    links: [
      { label: "Book a demo", href: "/contact" },
      { label: "Partner with us", href: "/contact?route=partner" },
      { label: "Fund innovation", href: "/contact?route=fund" },
      { label: "Media enquiries", href: "/contact?route=press" },
    ],
  },
];

/** Phone layout: [Platform, Company] on the left, [Products, Get in touch] on the right. */
const MOBILE_PAIRS: number[][] = [
  [0, 2],
  [1, 3],
];
/** Desktop keeps the copy deck's order regardless of the phone pairing. */
const DESKTOP_ORDER = ["md:order-1", "md:order-2", "md:order-3", "md:order-4"];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Child Safety and Data Rights", href: "/child-safety" },
  { label: "Accessibility", href: "/accessibility" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <RingDivider />
      <div className="mx-auto grid max-w-360 grid-cols-1 gap-9 px-8 py-11 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] md:gap-12 md:px-16 md:py-16">
        <div className="flex flex-col gap-4 md:gap-5">
          <Link href="/" className="focus-ring-dark flex w-fit items-center gap-2.75 rounded-[3px]">
            <Image
              src="/brand/cr8lab-mark.png"
              alt="CR8LAB mark"
              width={320}
              height={206}
              className="h-7 w-auto brightness-0 invert opacity-90"
            />
            <span className="font-display text-[19px] font-bold text-bone">CR8LAB</span>
          </Link>
          <p className="max-w-70 font-sans text-[14px] leading-relaxed text-bone/80">
            CR8LAB is a creative technology company building immersive learning platforms,
            spatial computing experiences and interactive stories. Made in Africa, built to
            travel.
          </p>
          {/* The newsletter line is a promise, not a form; on phones it costs a
              quarter-screen for no action, so it steps aside there. */}
          <p className="hidden max-w-70 font-sans text-[13px] leading-relaxed text-adire-caption md:block">
            What we are building, once a month. Product releases, Labs projects, research
            notes, and the occasional honest account of what did not work.
          </p>
        </div>

        {/* On phones the four groups sit in two columns that each stack their
            own pair, so a short group is followed immediately by the next one
            rather than by the dead space a shared grid row would leave. The
            pairs are chosen to hold twelve links each (5+7 and 8+4), so both
            columns end on the same line. From md the wrappers dissolve and the
            groups rejoin the outer grid in the copy deck's order. */}
        <div className="grid grid-cols-2 gap-x-6 md:contents">
          {MOBILE_PAIRS.map((pair, p) => (
            <div key={p} className="flex flex-col gap-8 md:contents">
              {pair.map((index) => {
                const column = COLUMNS[index];
                return (
                  <div
                    key={column.heading}
                    className={`flex flex-col gap-2.5 md:gap-3 ${DESKTOP_ORDER[index]}`}
                  >
                    <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wide text-adire-caption">
                      {column.heading}
                    </h3>
                    <ul className="flex flex-col gap-2 md:gap-2.5">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="focus-ring-dark rounded-[3px] font-sans text-[13px] text-bone/85 hover:text-danfo"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-adire-light/30 px-8 py-5 md:px-16 md:py-6">
        <p className="font-sans text-[12px] leading-relaxed text-bone/60">
          © [2026] CR8LAB. [Registered entity name, RC number.]{" "}
          {LEGAL_LINKS.map((link, i) => (
            <span key={link.href}>
              {i > 0 && " · "}
              <Link href={link.href} className="focus-ring-dark rounded-[3px] hover:text-danfo">
                {link.label}
              </Link>
            </span>
          ))}
        </p>
        <p className="mt-2 font-sans text-[13px] text-bone/85">[hello@cr8lab.com]</p>
      </div>
    </footer>
  );
}
