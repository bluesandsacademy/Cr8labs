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
      <div className="mx-auto grid max-w-360 grid-cols-1 gap-12 px-8 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] md:px-16">
        <div className="flex flex-col gap-4">
          <p className="max-w-70 font-sans text-[14px] leading-relaxed text-bone/80">
            CR8LAB is a creative technology company building immersive learning platforms,
            spatial computing experiences and interactive stories. Made in Africa, built to
            travel.
          </p>
          <p className="max-w-70 font-sans text-[13px] leading-relaxed text-adire-caption">
            What we are building, once a month. Product releases, Labs projects, research
            notes, and the occasional honest account of what did not work.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.heading} className="flex flex-col gap-3">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wide text-adire-caption">
              {column.heading}
            </h3>
            <ul className="flex flex-col gap-2.5">
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
        ))}
      </div>

      <div className="border-t border-adire-light/30 px-8 py-6 md:px-16">
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
