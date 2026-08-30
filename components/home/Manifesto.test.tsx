import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Manifesto } from "./Manifesto";

describe("Manifesto", () => {
  it("renders the belief statement and its supporting copy", () => {
    render(<Manifesto />);
    expect(screen.getByText(/We build the layer between a story and/)).toBeInTheDocument();
    expect(screen.getByText(/Because the future isn't just digital/)).toBeInTheDocument();
  });
});
