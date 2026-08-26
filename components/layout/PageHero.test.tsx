import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHero } from "./PageHero";

describe("PageHero", () => {
  it("renders the page title as the h1 with its lede", () => {
    render(<PageHero kicker="Work" title="Work" lede="Shipped, in daily use, and measured." />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Work");
    expect(screen.getByText("Shipped, in daily use, and measured.")).toBeInTheDocument();
  });

  it("renders the device slot when given", () => {
    render(<PageHero title="T" lede="L" device={<div data-testid="device" />} />);
    expect(screen.getByTestId("device")).toBeInTheDocument();
  });
});
