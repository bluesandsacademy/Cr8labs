import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CommunitySection } from "./CommunitySection";

describe("CommunitySection", () => {
  it("renders the heading and CTA", () => {
    render(<CommunitySection />);
    expect(
      screen.getByText("The next generation should be building this, not just using it")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Join the community" })).toHaveAttribute(
      "href",
      "/community"
    );
  });
});
