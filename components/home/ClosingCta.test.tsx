import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ClosingCta } from "./ClosingCta";

describe("ClosingCta", () => {
  it("renders the closing heading and body", () => {
    render(<ClosingCta />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Tell us what you want people to step into.",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Pilots, partnerships, licensing or investment. Start with a conversation about the material you already have."
      )
    ).toBeInTheDocument();
  });

  it("renders both closing CTAs", () => {
    render(<ClosingCta />);
    expect(screen.getByRole("link", { name: "Start a project" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "Book a demo" })).toHaveAttribute(
      "href",
      "/contact?route=demo#form"
    );
  });
});
