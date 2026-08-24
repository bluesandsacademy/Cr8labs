import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LabsSection } from "./LabsSection";

describe("LabsSection", () => {
  it("renders the heading, eyebrow and CTA", () => {
    render(<LabsSection />);
    expect(screen.getByText("CR8LAB Labs")).toBeInTheDocument();
    expect(screen.getByText("Not every idea starts with a client")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go into the Labs" })).toHaveAttribute(
      "href",
      "/labs"
    );
  });
});
