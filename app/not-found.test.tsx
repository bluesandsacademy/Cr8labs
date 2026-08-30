import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("404 page", () => {
  it("renders the docx's not-found copy exactly", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Nothing here.");
    expect(screen.getByText("Not even in three dimensions.")).toBeInTheDocument();
    expect(
      screen.getByText("Try the work, or tell us what you were looking for.")
    ).toBeInTheDocument();
  });

  it("renders both CTAs", () => {
    render(<NotFound />);
    expect(screen.getByRole("link", { name: "See the work" })).toHaveAttribute("href", "/products");
    expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "/contact");
  });

  it("renders the dark-theme nav", () => {
    render(<NotFound />);
    expect(screen.getByText("CR8LAB")).toBeInTheDocument();
  });
});
