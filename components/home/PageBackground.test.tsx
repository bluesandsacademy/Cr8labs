import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageBackground } from "./PageBackground";

describe("PageBackground", () => {
  it("mounts the headset image with real alt text", () => {
    render(<PageBackground />);
    const img = screen.getByAltText(
      "An unworn VR headset resting in darkness, concentric rings of warm golden light radiating outward from it into a dark, softly lit void"
    );
    expect(img.getAttribute("src")).toContain("hero-headset.png");
  });

  it("sets the nav tone on the document root and clears it on unmount", () => {
    const { unmount } = render(<PageBackground />);
    expect(document.documentElement.dataset.tone).toBe("dark");
    unmount();
    expect(document.documentElement.dataset.tone).toBeUndefined();
  });
});
