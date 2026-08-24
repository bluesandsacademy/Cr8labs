import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhyCr8lab } from "./WhyCr8lab";

describe("WhyCr8lab", () => {
  it("renders the section heading", () => {
    render(<WhyCr8lab />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Built in Africa. Designed for African realities. Made for global use.",
      })
    ).toBeInTheDocument();
  });

  it("renders all three pillars with their lead sentence as a distinct heading", () => {
    render(<WhyCr8lab />);
    expect(
      screen.getByRole("heading", { level: 3, name: "We build the technology, not the integration." })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "We design for the low end first." })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "We ship products, not pilots." })
    ).toBeInTheDocument();
  });

  it("renders the rest of each pillar's copy", () => {
    render(<WhyCr8lab />);
    expect(
      screen.getByText(/The 3D assets, the engine work, the content library/)
    ).toBeInTheDocument();
    expect(screen.getByText(/A campaign lasts six weeks\./)).toBeInTheDocument();
  });
});
