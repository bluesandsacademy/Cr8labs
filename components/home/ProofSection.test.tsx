import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProofSection } from "./ProofSection";

describe("ProofSection", () => {
  it("renders the heading, body and backing line", () => {
    render(<ProofSection />);
    expect(screen.getByText("We have already proven the model.")).toBeInTheDocument();
    expect(screen.getByText(/Education was the proving ground/)).toBeInTheDocument();
    expect(screen.getByText("Backed and deployed with LASRIC, NITDA and NTI.")).toBeInTheDocument();
  });

  it("renders the four shipped-not-prototyped proof points", () => {
    render(<ProofSection />);
    expect(
      screen.getByText("Immersive AR and VR experiences built and shipped, not prototyped")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Offline and low connectivity builds that run with no network at all")
    ).toBeInTheDocument();
  });
});
