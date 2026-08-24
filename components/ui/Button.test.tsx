import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders as a link with the given href and label", () => {
    render(<Button href="/demo" variant="primary">Book a demo</Button>);
    const link = screen.getByRole("link", { name: "Book a demo" });
    expect(link).toHaveAttribute("href", "/demo");
  });

  it("applies danfo fill for the primary variant", () => {
    render(<Button href="/x" variant="primary">Go</Button>);
    expect(screen.getByRole("link", { name: "Go" })).toHaveClass("bg-danfo");
  });

  it("applies ink fill for the dark variant", () => {
    render(<Button href="/x" variant="dark">Go</Button>);
    expect(screen.getByRole("link", { name: "Go" })).toHaveClass("bg-ink");
  });

  it("applies the dark-background focus ring when theme is dark", () => {
    render(<Button href="/x" variant="ghost" theme="dark">Go</Button>);
    expect(screen.getByRole("link", { name: "Go" })).toHaveClass("focus-ring-dark");
  });

  it("applies the light-background focus ring by default", () => {
    render(<Button href="/x" variant="ghost">Go</Button>);
    expect(screen.getByRole("link", { name: "Go" })).toHaveClass("focus-ring-light");
  });

  it("applies bone fill for the light variant, used on dark backgrounds", () => {
    render(<Button href="/x" variant="light">Go</Button>);
    expect(screen.getByRole("link", { name: "Go" })).toHaveClass("bg-bone");
  });
});
