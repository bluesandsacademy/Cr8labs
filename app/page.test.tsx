import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the nav, hero, trust bar and footer together", () => {
    render(<Home />);
    // "CR8LAB" now appears in both the nav and the footer wordmark.
    expect(screen.getAllByText("CR8LAB").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Stories you can walk into.");
    // Appears twice: the hero's glance-stat chip and the full TrustBar below it.
    expect(screen.getAllByText("10+").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/CR8LAB, by ARPedia · CREATE\. EXPERIMENT\. INNOVATE\./)).toBeInTheDocument();
  });

  it("renders the new Home sections between the hero and the footer", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Africa has the stories. They are stuck flat." })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "One immersive engine. Every project runs on it." })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "AR brings the story to you. VR takes you to the story." })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Four formats. One production line." })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Built for anyone with something worth stepping into." })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Story in. Experience out. IP kept." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Buy the engine off the shelf." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "We have already proven the model." })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Creative capability and technology infrastructure in the same company.",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Tell us what you want people to step into." })
    ).toBeInTheDocument();
  });

  it("does not crash on the now-duplicated 'Book a demo' CTA across nav, hero and closing sections", () => {
    render(<Home />);
    const demoLinks = screen.getAllByRole("link", { name: "Book a demo" });
    expect(demoLinks.length).toBeGreaterThanOrEqual(3);
  });
});
