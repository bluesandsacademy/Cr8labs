import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(
      <Reveal>
        <p>Some content</p>
      </Reveal>
    );
    expect(screen.getByText("Some content")).toBeInTheDocument();
  });

  it("passes through an extra className to its wrapper", () => {
    render(
      <Reveal className="my-class">
        <p>Content</p>
      </Reveal>
    );
    expect(screen.getByText("Content").parentElement).toHaveClass("my-class");
  });
});
