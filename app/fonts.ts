import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

// Clash Display (Fontshare), replacing Ojuju as the display face on the user's
// call: same boutique-foundry bar, but bold/sharp creative-studio confidence
// instead of Ojuju's masquerade quirk. Weights map to the old usage: 600 for
// section headings, 700 for the hero and major statements (500 available for
// quieter display moments).
export const clashDisplay = localFont({
  src: [
    { path: "./fonts/clash-display/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/clash-display/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/clash-display/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash-display",
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
