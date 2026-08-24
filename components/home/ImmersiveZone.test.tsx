import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImmersiveZone } from "./ImmersiveZone";

describe("ImmersiveZone", () => {
  it("renders without crashing and mounts the background image with real alt text", () => {
    render(<ImmersiveZone />);
    const img = screen.getByAltText(
      "A person from behind putting on a VR headset, concentric rings of warm golden light radiating from the lens into a dark, softly lit void"
    );
    expect(img.getAttribute("src")).toContain("hero-immersive-bg.png");
  });

  it("renders the Hero scene content", () => {
    render(<ImmersiveZone />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "The future of learning lives beyond the page"
    );
  });

  it("renders the TrustBar scene in its dark theme", () => {
    render(<ImmersiveZone />);
    const stat = screen.getByText("[100]+");
    expect(stat).toHaveClass("text-bone");
  });
});
