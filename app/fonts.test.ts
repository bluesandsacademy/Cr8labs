import { describe, it, expect } from "vitest";
import { ojuju, generalSans, jetbrainsMono } from "./fonts";

describe("app/fonts.ts", () => {
  it("exposes the expected CSS variable names", () => {
    expect(ojuju.variable).toBe("--font-ojuju");
    expect(generalSans.variable).toBe("--font-general-sans");
    expect(jetbrainsMono.variable).toBe("--font-jetbrains-mono");
  });
});
