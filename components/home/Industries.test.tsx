import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Industries } from "./Industries";

const TILES = ["Education", "Culture and publishing", "Brands and enterprise", "Training and simulation"];

describe("Industries", () => {
  it("renders the section heading", () => {
    render(<Industries />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Built for anyone with something worth stepping into." })
    ).toBeInTheDocument();
  });

  it("renders all four sector tiles", () => {
    render(<Industries />);
    for (const tile of TILES) {
      expect(screen.getByText(tile)).toBeInTheDocument();
    }
  });
});
