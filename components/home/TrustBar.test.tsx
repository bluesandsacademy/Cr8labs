import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrustBar } from "./TrustBar";

describe("TrustBar", () => {
  it("renders the trust line", () => {
    render(<TrustBar />);
    expect(
      screen.getByText("Built for Africa. Designed for the world. Running on technology we own.")
    ).toBeInTheDocument();
  });

  it("renders all four deck-sourced stats, unbracketed", () => {
    render(<TrustBar />);
    expect(screen.getByText("100+")).toBeInTheDocument();
    expect(screen.getByText("100,000+")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("150+")).toBeInTheDocument();
    expect(screen.getByText("institutions")).toBeInTheDocument();
    expect(screen.getByText("users")).toBeInTheDocument();
    expect(screen.getByText("countries")).toBeInTheDocument();
    expect(screen.getByText("interactive simulations")).toBeInTheDocument();
  });

  it("names the confirmed institutional partners", () => {
    render(<TrustBar />);
    expect(screen.getByText("Working with LASRIC, NITDA, NTI, CcHUB and ReLearn.")).toBeInTheDocument();
  });

  it("uses bone text on the dark theme instead of ink, since it now sits on a dark background", () => {
    render(<TrustBar theme="dark" />);
    const stat = screen.getByText("100+");
    expect(stat).toHaveClass("text-bone");
    expect(stat).not.toHaveClass("text-ink");
  });

  it("defaults to the light theme", () => {
    render(<TrustBar />);
    const stat = screen.getByText("100+");
    expect(stat).toHaveClass("text-ink");
  });
});
