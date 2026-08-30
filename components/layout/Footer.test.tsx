import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the brand mark linking back home", () => {
    render(<Footer />);
    const mark = screen.getByAltText("CR8LAB mark");
    const homeLink = mark.closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders the sign-off line with the CR8LAB and ARPedia credit", () => {
    render(<Footer />);
    expect(screen.getByText(/CR8LAB, by ARPedia · CREATE\. EXPERIMENT\. INNOVATE\./)).toBeInTheDocument();
  });

  it("renders the quick links for the new page set", () => {
    render(<Footer />);
    for (const label of ["About", "Solutions", "Products", "Industries", "Contact"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("renders the real contact details, not brackets", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "cr8labtech@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:cr8labtech@gmail.com"
    );
    expect(screen.getByText("07034194669")).toBeInTheDocument();
    expect(screen.getByText("Sangotedo, Lagos, Nigeria")).toBeInTheDocument();
  });
});
