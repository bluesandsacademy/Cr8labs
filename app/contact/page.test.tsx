import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactPage from "./page";

describe("Contact page", () => {
  it("opens with the site's own hero", async () => {
    render(await ContactPage({ searchParams: Promise.resolve({}) }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Let us build it together.");
  });

  it("preselects the form's route from ?route=", async () => {
    render(await ContactPage({ searchParams: Promise.resolve({ route: "fund" }) }));
    expect(screen.getByLabelText("I am contacting about")).toHaveValue("Investment");
  });

  it("renders the real contact details, not brackets", async () => {
    render(await ContactPage({ searchParams: Promise.resolve({}) }));
    const emailLinks = screen.getAllByRole("link", { name: "cr8labtech@gmail.com" });
    expect(emailLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of emailLinks) {
      expect(link).toHaveAttribute("href", "mailto:cr8labtech@gmail.com");
    }
    expect(screen.getAllByText("Sangotedo, Lagos, Nigeria").length).toBeGreaterThanOrEqual(1);
  });
});
