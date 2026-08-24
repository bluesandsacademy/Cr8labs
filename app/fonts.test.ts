import { describe, it, expect } from "vitest";
import { titanOne, generalSans, jetbrainsMono } from "./fonts";

describe("app/fonts.ts", () => {
  it("exposes the expected CSS variable names", () => {
    expect(titanOne.variable).toBe("--font-titan-one");
    expect(generalSans.variable).toBe("--font-general-sans");
    expect(jetbrainsMono.variable).toBe("--font-jetbrains-mono");
  });
});
