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

  it("renders the footer statement with the CR8LAB brand name", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        "CR8LAB is a creative technology company building immersive learning platforms, spatial computing experiences and interactive stories. Made in Africa, built to travel."
      )
    ).toBeInTheDocument();
  });

  it("renders all four column headings", () => {
    render(<Footer />);
    for (const heading of ["Platform", "Products", "Company", "Get in touch"]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
  });

  it("keeps the unconfirmed email and legal facts bracketed", () => {
    render(<Footer />);
    expect(screen.getByText("[hello@cr8lab.com]")).toBeInTheDocument();
    expect(screen.getByText(/© \[2026\] CR8LAB, by ARPedia\./)).toBeInTheDocument();
    expect(screen.getByText(/\[Registered entity name, RC number\.\]/)).toBeInTheDocument();
  });

  it("renders the newsletter line", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        "What we are building, once a month. Product releases, Labs projects, research notes, and the occasional honest account of what did not work."
      )
    ).toBeInTheDocument();
  });
});
