import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

// Titan One, the chosen display face: rounded poster black, friendly but loud.
// It ships in exactly one weight, so the face is declared to cover the whole
// 100-900 range - every font-semibold/font-bold heading resolves to this same
// file as an exact match instead of the browser synthesizing a fake bold on
// top of an already-black face (which distorts it).
export const titanOne = localFont({
  src: [{ path: "./fonts/titan-one/TitanOne-Regular.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-titan-one",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// General Sans (Fontshare), not Switzer: Switzer read too thin/washed out at
// body sizes in practice. Same boutique-foundry bar, but a rounder, inkier
// default presence.
export const generalSans = localFont({
  src: [
    { path: "./fonts/general-sans/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/general-sans/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/general-sans/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/general-sans/GeneralSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});
