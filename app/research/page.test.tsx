import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ResearchPage from "./page";

describe("Research page", () => {
  it("opens with the deck's hero and the eight topics", () => {
    render(<ResearchPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Research");
    expect(screen.getByText(/A company selling learning technology owes the field its evidence\./)).toBeInTheDocument();
    for (const title of ["Future of learning", "Spatial computing", "AI ethics in the classroom", "Accessibility in XR"]) {
      expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    }
  });

  it("uses the deck's holding copy and bracketed entries rather than invented papers", () => {
    render(<ResearchPage />);
    expect(screen.getByText(/Our first publications are in preparation\./)).toBeInTheDocument();
    expect(screen.getAllByText("[Title], [date]. [One line.]")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Research collaboration" })).toHaveAttribute("href", "/contact?route=research");
  });
});
