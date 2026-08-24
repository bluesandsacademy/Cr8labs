import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the nav, hero, trust bar and footer together", () => {
    render(<Home />);
    // "CR8LAB" now appears in both the nav and the footer wordmark.
    expect(screen.getAllByText("CR8LAB").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "The future of learning lives beyond the page"
    );
    expect(screen.getByText("[100]+")).toBeInTheDocument();
    expect(
      screen.getByText(
        "CR8LAB is a creative technology company building immersive learning platforms, spatial computing experiences and interactive stories. Made in Africa, built to travel."
      )
    ).toBeInTheDocument();
  });
});
