import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactPage from "./page";

describe("Contact page", () => {
  it("opens with the deck's hero and all seven routes", async () => {
    render(await ContactPage({ searchParams: Promise.resolve({}) }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Start here");
    for (const name of [
      "Book a demo",
      "Partner with us",
      "Fund innovation",
      "Join the team",
      "Become a publisher",
      "Research collaboration",
      "Media enquiries",
    ]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
    expect(screen.getByText(/We answer press within \[one\] working day\./)).toBeInTheDocument();
  });

  it("preselects the form's route from ?route=", async () => {
    render(await ContactPage({ searchParams: Promise.resolve({ route: "fund" }) }));
    expect(screen.getByLabelText("I am here to")).toHaveValue("invest or fund");
  });

  it("keeps the direct details bracketed", async () => {
    render(await ContactPage({ searchParams: Promise.resolve({}) }));
    expect(screen.getByText(/\[hello@cr8lab\.com\] · \[phone\] · \[office address\], Lagos, Nigeria/)).toBeInTheDocument();
  });
});
