import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LabsPage from "./page";

describe("Labs page", () => {
  it("opens with the deck's hero", () => {
    render(<LabsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Not every idea starts with a client");
    expect(screen.getByText(/Some of it stays a public good\./)).toBeInTheDocument();
  });

  it("renders all eight projects with the deck's own status lines", () => {
    render(<LabsPage />);
    for (const title of [
      "Living Books",
      "Digital Heritage",
      "AR Storytelling",
      "African STEM Worlds",
      "Interactive Children's Literature",
      "Historical Reconstructions",
      "AI Learning Research",
      "XR Accessibility",
    ]) {
      expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    }
    expect(screen.getAllByText("Status: [in development]")).toHaveLength(3);
    expect(screen.getAllByText("Status: [ongoing]")).toHaveLength(2);
    expect(screen.getByText("Status: [X titles published, X in production]")).toBeInTheDocument();
  });

  it("closes with the deck's partnership line and a route to fund", () => {
    render(<LabsPage />);
    expect(screen.getByText(/We take commissions, co-productions and grant funded partnerships/)).toBeInTheDocument();
    // The footer carries a "Fund innovation" link too; the page's own goes to the fund route.
    const links = screen.getAllByRole("link", { name: "Fund innovation" });
    expect(links.some((a) => a.getAttribute("href") === "/contact?route=fund")).toBe(true);
  });
});
