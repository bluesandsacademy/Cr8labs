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

  it("renders the rest of the docx home content between the immersive zone and the footer", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 2, name: "One platform. Many worlds." })
    ).toBeInTheDocument();
    expect(screen.getByText("Interactive Books")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Where our work runs" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Built in Africa. Designed for African realities. Made for global use.",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "The next generation will not learn the way the last one did",
      })
    ).toBeInTheDocument();
  });

  it("does not crash on the now-duplicated 'Book a demo' CTA across nav, hero and closing sections", () => {
    render(<Home />);
    const demoLinks = screen.getAllByRole("link", { name: "Book a demo" });
    expect(demoLinks.length).toBeGreaterThanOrEqual(3);
  });
});
