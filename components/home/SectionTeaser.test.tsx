import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionTeaser } from "./SectionTeaser";

describe("SectionTeaser", () => {
  it("renders the heading and body", () => {
    render(<SectionTeaser heading="A heading" body="Some body copy." />);
    expect(screen.getByRole("heading", { level: 2, name: "A heading" })).toBeInTheDocument();
    expect(screen.getByText("Some body copy.")).toBeInTheDocument();
  });

  it("renders an eyebrow only when given one", () => {
    const { rerender } = render(<SectionTeaser heading="H" body="B" eyebrow="Work" />);
    expect(screen.getByText("Work")).toBeInTheDocument();

    rerender(<SectionTeaser heading="H" body="B" />);
    expect(screen.queryByText("Work")).not.toBeInTheDocument();
  });

  it("renders a CTA link only when given one", () => {
    const { rerender } = render(
      <SectionTeaser heading="H" body="B" cta={{ label: "Read more", href: "/more" }} />
    );
    const link = screen.getByRole("link", { name: "Read more" });
    expect(link).toHaveAttribute("href", "/more");

    rerender(<SectionTeaser heading="H" body="B" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
