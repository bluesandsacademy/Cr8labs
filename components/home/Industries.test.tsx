import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Industries } from "./Industries";

const TILES = [
  "Education",
  "Museums and culture",
  "Publishing",
  "Healthcare",
  "Manufacturing and industrial training",
  "Retail and brands",
  "Tourism",
  "Government",
  "Creative and cultural industries",
];

describe("Industries", () => {
  it("renders the section heading and intro", () => {
    render(<Industries />);
    expect(screen.getByRole("heading", { level: 2, name: "Where our work runs" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "We started in classrooms because that is the hardest room to hold. The same technology now runs in galleries, showrooms, training centres and campaigns."
      )
    ).toBeInTheDocument();
  });

  it("renders all nine industry tiles", () => {
    render(<Industries />);
    for (const tile of TILES) {
      expect(screen.getByText(tile)).toBeInTheDocument();
    }
  });
});
