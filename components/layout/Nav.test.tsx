import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Nav } from "./Nav";

const NAV_LINKS = ["About", "Solutions", "Products", "Industries", "Contact"];

describe("Nav", () => {
  it("renders the CR8LAB wordmark", () => {
    render(<Nav theme="light" />);
    expect(screen.getByText("CR8LAB")).toBeInTheDocument();
  });

  it("renders the new IA's five links plus the demo CTA", () => {
    render(<Nav theme="light" />);
    for (const label of NAV_LINKS) {
      expect(screen.getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    }
    expect(screen.getAllByRole("link", { name: "Book a demo" }).length).toBeGreaterThan(0);
  });

  it("hides the mobile menu until the toggle is opened", async () => {
    render(<Nav theme="light" />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(screen.getByTestId("nav-links")).toHaveClass("hidden");
    await userEvent.click(toggle);
    expect(screen.getByTestId("nav-links")).not.toHaveClass("hidden");
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();
  });

  it("renders the Lagos line in the mobile menu once opened", async () => {
    render(<Nav theme="light" />);
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByText("Lagos, Nigeria. Building since [year].")).toBeInTheDocument();
  });

  it("closes the mobile menu when a mobile nav link is clicked", async () => {
    render(<Nav theme="light" />);
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const list = screen.getByTestId("nav-links");
    expect(list).not.toHaveClass("hidden");
    await userEvent.click(within(list).getByRole("link", { name: "About" }));
    expect(list).toHaveClass("hidden");
  });
});
