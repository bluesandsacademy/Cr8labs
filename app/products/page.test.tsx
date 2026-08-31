import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductsPage from "./page";

describe("Products page", () => {
  it("opens with the site's own hero", () => {
    render(<ProductsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Built in Lagos. Running in classrooms, on tablets, with the network off."
    );
  });

  it("renders all four kits with price and format", () => {
    render(<ProductsPage />);
    for (const name of ["Into the Community", "Into the Curiosity Q", "AR Science Lab", "Experience Africa"]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
    expect(screen.getByText("from $250")).toBeInTheDocument();
    expect(screen.getByText("from $500")).toBeInTheDocument();
  });

  it("links each kit's card through to its own product page", () => {
    render(<ProductsPage />);
    const heading = screen.getByRole("heading", { name: "Experience Africa" });
    const card = heading.closest("a");
    expect(card).toHaveAttribute("href", "/products/experience-africa");
  });

  it("renders the how-it-works steps", () => {
    render(<ProductsPage />);
    expect(screen.getByRole("heading", { name: "1. Set up" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "3. Play" })).toBeInTheDocument();
    expect(
      screen.getByText("Works fully offline once installed. No account, no subscription, no setup fee.")
    ).toBeInTheDocument();
  });

  it("renders the institutional pricing CTA", () => {
    render(<ProductsPage />);
    expect(screen.getByRole("link", { name: "Request organization pricing" })).toHaveAttribute(
      "href",
      "/contact"
    );
  });
});
