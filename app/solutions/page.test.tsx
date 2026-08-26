import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SolutionsPage from "./page";

describe("Solutions page", () => {
  it("opens with the deck's hero and puts the problem first", () => {
    render(<SolutionsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Solutions");
    expect(screen.getByText(/Every section below states the problem first/)).toBeInTheDocument();
    const labels = screen.getAllByText("problem");
    expect(labels).toHaveLength(10);
  });

  it("renders all ten sectors, each reachable from the ring", () => {
    render(<SolutionsPage />);
    for (const name of [
      "Schools",
      "Parents and families",
      "Governments and ministries",
      "Publishers",
      "Museums, galleries and heritage",
      "NGOs and development partners",
      "Corporate and industrial training",
      "Universities",
      "Science centres and libraries",
      "Creators and studios",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    expect(document.querySelectorAll('a[href^="#"]')).toHaveLength(10);
  });

  it("keeps the deck's figures bracketed", () => {
    render(<SolutionsPage />);
    expect(screen.getByText(/from \[₦8,000\] a term\./)).toBeInTheDocument();
    expect(screen.getByText(/\[40 to 50\] percent/)).toBeInTheDocument();
  });
});
