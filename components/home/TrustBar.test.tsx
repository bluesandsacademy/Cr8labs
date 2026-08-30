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

  it("renders all five proof-bar stats", () => {
    render(<TrustBar />);
    expect(screen.getByText("$20K+")).toBeInTheDocument();
    expect(screen.getByText("10,000+")).toBeInTheDocument();
    expect(screen.getByText("150+")).toBeInTheDocument();
    expect(screen.getByText("10+")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("revenue generated")).toBeInTheDocument();
    expect(screen.getByText("users reached")).toBeInTheDocument();
    expect(screen.getByText("interactive simulations")).toBeInTheDocument();
    expect(screen.getByText("institutions deployed")).toBeInTheDocument();
    expect(screen.getByText("states in Nigeria")).toBeInTheDocument();
  });

  it("names the confirmed institutional partners", () => {
    render(<TrustBar />);
    expect(screen.getByText("Working with LASRIC, NITDA, NTI, CcHUB and ReLearn.")).toBeInTheDocument();
  });

  it("uses bone text on the dark theme instead of ink, since it now sits on a dark background", () => {
    render(<TrustBar theme="dark" />);
    const stat = screen.getByText("$20K+");
    expect(stat).toHaveClass("text-bone");
    expect(stat).not.toHaveClass("text-ink");
  });

  it("defaults to the light theme", () => {
    render(<TrustBar />);
    const stat = screen.getByText("$20K+");
    expect(stat).toHaveClass("text-ink");
  });
});
