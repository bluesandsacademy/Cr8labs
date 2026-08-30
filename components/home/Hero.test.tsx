import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the headline", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Stories you can walk into.");
  });

  it("renders the eyebrow and supporting body copy", () => {
    render(<Hero />);
    expect(screen.getByText("Africa's Immersive Creative Technology Company")).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, el) =>
          el?.tagName.toLowerCase() === "p" &&
          el.textContent ===
            "CR8LAB is a creative technology company. We build AR, VR, and 3D experiences for the institutions, publishers, and brands who own Africa's stories, knowledge, and culture."
      )
    ).toBeInTheDocument();
  });

  it("renders both hero CTAs", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "Book a demo" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "Partner with us" })).toHaveAttribute(
      "href",
      "/contact?route=partner#form"
    );
  });

  it("renders no slider controls while there is only one headline to show", () => {
    render(<Hero />);
    expect(screen.queryByRole("button", { name: "Next headline" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Previous headline" })).toBeNull();
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
    expect(screen.getByText("10+")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
