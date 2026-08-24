import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ClosingCta } from "./ClosingCta";

describe("ClosingCta", () => {
  it("renders the closing heading and body", () => {
    render(<ClosingCta />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "The next generation will not learn the way the last one did",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Whether you run a school, a ministry, a museum, a publishing house or a fund, the conversation starts the same way. Tell us what you want people to be able to do."
      )
    ).toBeInTheDocument();
  });

  it("renders both closing CTAs", () => {
    render(<ClosingCta />);
    expect(screen.getByRole("link", { name: "Book a demo" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Partner with us" })).toBeInTheDocument();
  });
});
