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

  it("keeps all four unconfirmed stats bracketed", () => {
    render(<TrustBar />);
    expect(screen.getByText("[100]+")).toBeInTheDocument();
    expect(screen.getByText("[20,000]+")).toBeInTheDocument();
    expect(screen.getByText("[6]")).toBeInTheDocument();
    expect(screen.getByText("[250]+")).toBeInTheDocument();
    expect(screen.getByText("schools")).toBeInTheDocument();
    expect(screen.getByText("students")).toBeInTheDocument();
    expect(screen.getByText("countries")).toBeInTheDocument();
    expect(screen.getByText("interactive experiences")).toBeInTheDocument();
  });
});
