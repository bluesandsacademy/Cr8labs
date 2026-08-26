import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ResourcesPage from "./page";

describe("Resources page", () => {
  it("opens with the deck's hero and lists all eight sections", () => {
    render(<ResourcesPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Resources");
    for (const title of ["Blog", "Documentation", "Developer API", "Lesson plans", "Downloads", "Media kit", "Brand assets", "FAQs"]) {
      expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    }
  });

  it("renders the eight questions with their answers verbatim", () => {
    render(<ResourcesPage />);
    expect(screen.getByText("Does it work without internet?")).toBeInTheDocument();
    expect(screen.getByText(/Content packs download once and every lesson, experiment and assessment runs offline\./)).toBeInTheDocument();
    expect(screen.getByText(/Schools from \[₦80,000\] per term\./)).toBeInTheDocument();
    expect(document.querySelectorAll("details")).toHaveLength(8);
  });
});
