import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Manifesto } from "./Manifesto";

describe("Manifesto", () => {
  it("renders the belief statement and its supporting copy", () => {
    render(<Manifesto />);
    expect(screen.getByText(/Learning should never be limited to/)).toBeInTheDocument();
    expect(screen.getByText(/That belief is the whole reason CR8LAB exists/)).toBeInTheDocument();
  });
});
