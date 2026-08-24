import { describe, it, expect } from "vitest";
import { clashDisplay, generalSans, jetbrainsMono } from "./fonts";

describe("app/fonts.ts", () => {
  it("exposes the expected CSS variable names", () => {
    expect(clashDisplay.variable).toBe("--font-clash-display");
    expect(generalSans.variable).toBe("--font-general-sans");
    expect(jetbrainsMono.variable).toBe("--font-jetbrains-mono");
  });
});
