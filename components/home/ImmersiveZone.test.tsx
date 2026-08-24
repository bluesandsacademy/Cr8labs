import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImmersiveZone } from "./ImmersiveZone";

describe("ImmersiveZone", () => {
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

  it("exposes the data attributes the page background drives", () => {
    const { container } = render(<ImmersiveZone />);
    expect(container.querySelector("[data-immersive-zone]")).not.toBeNull();
    expect(container.querySelector('[data-scene="hero"]')).not.toBeNull();
    expect(container.querySelector('[data-scene="trust"]')).not.toBeNull();
  });
});
