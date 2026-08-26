import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WorkPage from "./page";

describe("Work page", () => {
  it("opens with the deck's hero and case study title", () => {
    render(<WorkPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Work");
    expect(screen.getByText("Shipped, in daily use, and measured. Not concepts.")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Building practical science for classrooms with no laboratory" })
    ).toBeInTheDocument();
  });

  it("carries the deck's challenge copy verbatim", () => {
    render(<WorkPage />);
    expect(
      screen.getByText(
        /Across six African markets, between 45 and 75 percent of secondary schools have no adequate science laboratory\./
      )
    ).toBeInTheDocument();
  });

  it("keeps every impact figure bracketed and omits the quote slot", () => {
    render(<WorkPage />);
    for (const value of ["[100]", "[20,000]", "[250]"]) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
    expect(screen.getAllByText("[X]")).toHaveLength(2);
    expect(screen.getByText(/Institutional work with \[LASRIC, NITDA, NTI, CcHUB, ReLearn\]/)).toBeInTheDocument();
    expect(screen.queryByText(/Named quote/)).not.toBeInTheDocument();
  });

  it("uses the deck's holding copy for further work instead of invented cases", () => {
    render(<WorkPage />);
    expect(
      screen.getByText(/Some of our work sits under client agreements we will not break to fill a portfolio page\./)
    ).toBeInTheDocument();
    expect(screen.getByText("Culture and festivals")).toBeInTheDocument();
  });
});
