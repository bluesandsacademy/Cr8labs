import type { Metadata } from "next";
import { clashDisplay, generalSans, jetbrainsMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "CR8LAB | Creative Technology Company, Lagos",
  description:
    "CR8LAB builds immersive learning platforms, spatial computing experiences and interactive stories using AR, VR and AI. Original technology, made in Africa, built for global use.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${generalSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
