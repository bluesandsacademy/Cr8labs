import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProofSection } from "./ProofSection";

describe("ProofSection", () => {
  it("renders the heading, bracketed stats and CTA", () => {
    render(<ProofSection />);
    expect(
      screen.getByText(/Most companies in this category show a demo/)
    ).toBeInTheDocument();
    expect(screen.getByText("[100]")).toBeInTheDocument();
    expect(screen.getByText("[20,000]")).toBeInTheDocument();
    expect(screen.getByText("[6]")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Read the case study" })).toHaveAttribute(
      "href",
      "/work"
    );
  });
});
