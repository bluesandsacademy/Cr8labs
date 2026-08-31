import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BackedBy } from "./BackedBy";

describe("BackedBy", () => {
  it("renders the caption and every confirmed institutional partner", () => {
    render(<BackedBy />);
    expect(screen.getByText("Backed and deployed with")).toBeInTheDocument();
    for (const partner of ["LASRIC", "NITDA", "NTI"]) {
      expect(screen.getByText(partner)).toBeInTheDocument();
    }
  });
});
