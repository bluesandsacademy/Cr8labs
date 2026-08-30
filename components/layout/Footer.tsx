import Image from "next/image";
import Link from "next/link";

const QUICK_LINKS = [
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

/**
 * Ported from bluesandsk12's components/common/footer.jsx: one compact dark
 * band, not a four-column link directory. Logo and sign-off on the left, a
 * pill-shaped quick-link row, contact details on the right. Contact details
 * are the real ones from the site's own Contact page copy, not brackets.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-adire-dark text-bone">
      <div className="relative page-frame flex flex-col items-center gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Link href="/" className="focus-ring-dark inline-flex shrink-0 items-center gap-2.75 rounded-[3px]">
            <Image
              src="/brand/cr8lab-mark.png"
              alt="CR8LAB mark"
              width={320}
              height={206}
              className="h-8 w-auto brightness-0 invert opacity-90"
            />
            <span className="font-display text-lg font-bold text-bone">CR8LAB</span>
          </Link>
          <p className="text-center font-sans text-xs font-semibold text-bone/50 sm:text-left">
            © {new Date().getFullYear()} CR8LAB, by ARPedia · CREATE. EXPERIMENT. INNOVATE.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-2">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring-dark whitespace-nowrap rounded-full bg-white/10 px-4 py-2 font-sans text-sm font-bold text-bone/80 transition-colors hover:bg-white/20 hover:text-bone"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-1 text-center font-sans text-xs font-semibold text-bone/60 sm:items-end sm:text-right">
          <a href="mailto:cr8labtech@gmail.com" className="focus-ring-dark rounded-[3px] hover:text-bone">
            cr8labtech@gmail.com
          </a>
          <span>07034194669</span>
          <span>Sangotedo, Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
