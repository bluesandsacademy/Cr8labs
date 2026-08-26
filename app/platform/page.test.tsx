import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PlatformPage from "./page";

describe("Platform page", () => {
  it("opens with the deck's hero", () => {
    render(<PlatformPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("One platform. Multiple worlds.");
    expect(screen.getByText(/what happens when the network does not\./)).toBeInTheDocument();
  });

  it("names all seven layers, in the stack and in the rings legend", () => {
    render(<PlatformPage />);
    for (const layer of [
      "Physical books",
      "Mobile app",
      "Cloud platform",
      "AI engine",
      "Learning analytics",
      "Creator Studio",
      "Immersive experiences",
    ]) {
      expect(screen.getAllByText(layer).length).toBeGreaterThanOrEqual(2);
    }
  });

  it("keeps the deck's positions and brackets verbatim", () => {
    render(<PlatformPage />);
    expect(screen.getByText(/No automated decision sets a child's placement or grade\./)).toBeInTheDocument();
    expect(screen.getByText(/Do not list an unbuilt integration without the word roadmap next to it\./)).toBeInTheDocument();
    expect(screen.getByText(/we act within \[X\] working days\./)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Read our full position on children's data" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Talk to us about integration" })).toBeInTheDocument();
  });
});
