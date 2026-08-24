import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the headline with the accent phrase", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "The future of learning lives beyond the page"
    );
  });

  it("renders the supporting body copy", () => {
    render(<Hero />);
    expect(
      screen.getByText(
        "CR8LAB builds experiences that join books, augmented reality, virtual reality, artificial intelligence and interactive storytelling into one platform. Knowledge you can hold, walk into and take apart."
      )
    ).toBeInTheDocument();
  });

  it("renders both hero CTAs", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "Explore the platform" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book a demo" })).toBeInTheDocument();
  });
});
