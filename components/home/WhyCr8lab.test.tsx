import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhyCr8lab } from "./WhyCr8lab";

describe("WhyCr8lab", () => {
  it("renders the section heading", () => {
    render(<WhyCr8lab />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Creative capability and technology infrastructure in the same company.",
      })
    ).toBeInTheDocument();
  });

  it("renders all four pillars with their lead sentence as a distinct heading", () => {
    render(<WhyCr8lab />);
    expect(screen.getByRole("heading", { level: 3, name: "African market insight" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Content and IP we already own" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "AI and XR capability in-house" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Offline craft" })).toBeInTheDocument();
  });

  it("renders the rest of each pillar's copy", () => {
    render(<WhyCr8lab />);
    expect(screen.getByText(/We build for the classrooms, budgets, devices/)).toBeInTheDocument();
    expect(screen.getByText(/Most studios cannot ship this\./)).toBeInTheDocument();
  });
});
