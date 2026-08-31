"use client";

import { useEffect, useRef } from "react";

/**
 * A silent, looping, autoplaying background video with a controllable
 * playback speed — the one thing a plain <video> tag can't do by itself,
 * since HTML has no "slow this down" attribute. Used for the CEO's
 * product-demo footage wherever it plays at its own pace rather than the
 * user's, e.g. slowed down so it reads as ambient rather than sped-up.
 */
export function BackgroundVideo({
  src,
  className,
  rate = 1,
}: {
  src: string;
  className?: string;
  rate?: number;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (ref.current) ref.current.playbackRate = rate;
  }, [rate]);

  return (
    <video ref={ref} className={className} autoPlay muted loop playsInline aria-hidden="true">
      <source src={src} type="video/mp4" />
    </video>
  );
}
