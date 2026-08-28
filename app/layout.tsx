import type { Metadata, Viewport } from "next";
import { titanOne, generalSans, jetbrainsMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "CR8LAB | Creative Technology Company, Lagos",
  description:
    "CR8LAB builds immersive learning platforms, spatial computing experiences and interactive stories using AR, VR and AI. Original technology, made in Africa, built for global use.",
};

// themeColor lives here, not on `metadata`, as of Next 14 (see AGENTS.md:
// this Next version's own docs deprecate metadata.themeColor in favour of
// this export). Adire, the world you land in after the hero's dive.
export const viewport: Viewport = {
  themeColor: "#211d54",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${titanOne.variable} ${generalSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
