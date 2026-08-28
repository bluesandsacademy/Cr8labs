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
        (_, el) =>
          el?.tagName.toLowerCase() === "p" &&
          el.textContent ===
            "CR8LAB builds experiences that join books, augmented reality, virtual reality, artificial intelligence and interactive storytelling into one platform. Knowledge you can hold, walk into and take apart."
      )
    ).toBeInTheDocument();
  });

  it("renders both hero CTAs", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "Explore the platform" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book a demo" })).toBeInTheDocument();
  });

  it("renders the video with a working source and a poster fallback", () => {
    const { container } = render(<Hero />);
    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video?.getAttribute("poster")).toBe("/brand/hero-video-poster.jpg");
    expect(container.querySelector("source")?.getAttribute("src")).toBe("/hero-vid.mp4");
  });

  it("exposes a play/pause control for the auto-playing video", () => {
    render(<Hero />);
    expect(screen.getByRole("button", { name: "Pause the background video" })).toBeInTheDocument();
  });

  it("renders the two glance-stat figures from TrustBar's own data", () => {
    render(<Hero />);
    expect(screen.getByText("100+")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });
});
