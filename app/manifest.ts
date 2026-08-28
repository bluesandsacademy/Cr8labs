import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CR8LAB",
    short_name: "CR8LAB",
    description:
      "CR8LAB builds immersive learning platforms, spatial computing experiences and interactive stories using AR, VR and AI.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3ecde",
    theme_color: "#211d54",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
