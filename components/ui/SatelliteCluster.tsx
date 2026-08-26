import Image from "next/image";

/**
 * One large circle (the platform, the studio) with small satellite circles
 * in accent colours overlapping its edge (the people around it), drifting
 * gently on their own periods. Shared by Home's community section and the
 * Studio hero.
 */
export function SatelliteCluster({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  return (
    <div className="relative mx-auto w-full max-w-95">
      <div className="relative aspect-square w-full overflow-hidden rounded-full">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
      <span
        className="absolute -left-4 top-[12%] h-10 w-10 rounded-full bg-danfo motion-safe:animate-[float_7s_ease-in-out_infinite]"
        aria-hidden="true"
      />
      <span
        className="absolute -right-2 bottom-[16%] flex h-14 w-14 items-center justify-center rounded-full border-2 border-laterite motion-safe:animate-[float_9s_ease-in-out_infinite] motion-safe:[animation-delay:-3s]"
        aria-hidden="true"
      >
        <span className="h-2 w-2 rounded-full bg-laterite" />
      </span>
      <span
        className="absolute -bottom-3 left-[22%] h-6 w-6 rounded-full border-2 border-adire motion-safe:animate-[float_6s_ease-in-out_infinite] motion-safe:[animation-delay:-1.5s]"
        aria-hidden="true"
      />
    </div>
  );
}
