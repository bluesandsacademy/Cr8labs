import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StudioPage from "./page";

describe("Studio page", () => {
  it("opens with the deck's hero and story", () => {
    render(<StudioPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("The studio");
    expect(screen.getByText(/CR8LAB is that company\. Blue Sands is the first platform built on it/)).toBeInTheDocument();
  });

  it("renders the team as the deck's bracketed placeholders with no faces", () => {
    render(<StudioPage />);
    expect(screen.getAllByText("[Name]")).toHaveLength(4);
    expect(screen.getByText("[One line on what they have shipped.]")).toBeInTheDocument();
    const teamHeading = screen.getByRole("heading", { name: "Team" });
    expect(teamHeading.parentElement?.querySelector("img")).toBeNull();
  });

  it("carries the boilerplate, the values and the bracketed facts verbatim", () => {
    render(<StudioPage />);
    expect(screen.getByText(/CR8LAB is a creative technology company based in Lagos, Nigeria/)).toBeInTheDocument();
    expect(screen.getByText("Say the number or say nothing. No claim we cannot evidence in a due diligence call.")).toBeInTheDocument();
    expect(screen.getByText("[LASRIC, NITDA, NTI, CcHUB, ReLearn.]")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Join the team" })).toHaveAttribute("href", "/contact?route=join");
  });
});
