import Image from "next/image";

/**
 * A photograph in a portal arch: a ring opened into a doorway, in the
 * system's standard double-ring frame with a danfo point at the apex.
 */
export function PortalArch({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  return (
    <div className="relative mx-auto w-full max-w-105">
      <div className="rounded-t-full border-2 border-adire p-3">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full">
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        </div>
      </div>
      <span
        className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-danfo motion-safe:animate-[pulse-soft_3.5s_ease-in-out_infinite]"
        aria-hidden="true"
      />
    </div>
  );
}
