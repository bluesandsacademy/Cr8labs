import { describe, it, expect } from "vitest";
import { ojuju, switzer, jetbrainsMono } from "./fonts";

describe("app/fonts.ts", () => {
  it("exposes the expected CSS variable names", () => {
    expect(ojuju.variable).toBe("--font-ojuju");
    expect(switzer.variable).toBe("--font-switzer");
    expect(jetbrainsMono.variable).toBe("--font-jetbrains-mono");
  });
});
