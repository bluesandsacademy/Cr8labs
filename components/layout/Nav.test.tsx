import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Nav } from "./Nav";

const NAV_LINKS = [
  "Platform",
  "Products",
  "Solutions",
  "Work",
  "Labs",
  "Studio",
  "Research",
  "Community",
  "Resources",
];

describe("Nav", () => {
  it("renders the CR8LAB wordmark", () => {
    render(<Nav theme="light" />);
    expect(screen.getByText("CR8LAB")).toBeInTheDocument();
  });

  it("renders all nine primary nav links plus the demo CTA", () => {
    render(<Nav theme="light" />);
    for (const label of NAV_LINKS) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: "Book a demo" })).toBeInTheDocument();
  });

  it("hides the link list from the accessibility tree until the mobile menu is opened", async () => {
    render(<Nav theme="light" />);
    const toggle = screen.getByRole("button", { name: /menu/i });
    const list = screen.getByTestId("nav-links");
    expect(list).toHaveClass("hidden");
    await userEvent.click(toggle);
    expect(list).not.toHaveClass("hidden");
  });

  it("renders the Lagos line in the mobile menu once opened, with the docx's own placeholder", async () => {
    render(<Nav theme="light" />);
    await userEvent.click(screen.getByRole("button", { name: /menu/i }));
    expect(screen.getByText("Lagos, Nigeria. Building since [year].")).toBeInTheDocument();
  });

  it("uses a bone-filled CTA on the dark theme, so it doesn't go ink-on-dark", () => {
    render(<Nav theme="dark" />);
    expect(screen.getByRole("link", { name: "Book a demo" })).toHaveClass("bg-bone");
  });
});
