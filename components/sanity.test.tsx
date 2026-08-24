import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function Hello() {
  return <p>Hello CR8LAB</p>;
}

describe("test harness", () => {
  it("renders a component and finds it by text", () => {
    render(<Hello />);
    expect(screen.getByText("Hello CR8LAB")).toBeInTheDocument();
  });
});
