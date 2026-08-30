import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import SolutionsPage from "./page";

describe("Solutions page", () => {
  it("opens with the site's own hero", () => {
    render(<SolutionsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "We build worlds people step into, not content they scroll past."
    );
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("link", { name: "Book a demo" })).toHaveAttribute("href", "/contact");
    expect(main.getByRole("link", { name: "Partner with us" })).toHaveAttribute(
      "href",
      "/contact?route=partner#form"
    );
  });

  it("links all four industry cards to their sub-pages", () => {
    render(<SolutionsPage />);
    expect(screen.getByRole("link", { name: /Education/ })).toHaveAttribute("href", "/solutions/education");
    expect(screen.getByRole("link", { name: /Culture and publishing/ })).toHaveAttribute(
      "href",
      "/solutions/culture-and-publishing"
    );
    expect(screen.getByRole("link", { name: /Brands and enterprise/ })).toHaveAttribute(
      "href",
      "/solutions/brands-and-enterprise"
    );
    expect(screen.getByRole("link", { name: /Training and simulation/ })).toHaveAttribute(
      "href",
      "/solutions/training-and-simulation"
    );
  });
});
