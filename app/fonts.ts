import { Ojuju, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

export const ojuju = Ojuju({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-ojuju",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const switzer = localFont({
  src: [
    { path: "./fonts/switzer/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/switzer/Switzer-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/switzer/Switzer-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/switzer/Switzer-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});
