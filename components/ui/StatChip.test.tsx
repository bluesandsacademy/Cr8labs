import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatChip } from "./StatChip";

describe("StatChip", () => {
  it("keeps the bracketed figure as its own text node and the suffix after it", () => {
    render(<StatChip value="[100]+" label="schools" />);
    const bracket = screen.getByText("[100]");
    expect(bracket).toHaveClass("text-laterite-text");
    expect(bracket.parentElement).toHaveTextContent("[100]+");
    expect(screen.getByText("schools")).toBeInTheDocument();
  });

  it("renders a value with a word suffix", () => {
    render(<StatChip value="[X] percent" label="higher reported engagement" tone="dark" />);
    expect(screen.getByText("[X]")).toHaveClass("text-laterite-tint");
    expect(screen.getByText("[X]").parentElement).toHaveTextContent("[X] percent");
  });
});
