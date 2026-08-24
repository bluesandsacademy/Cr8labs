import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { RingDivider } from "./RingDivider";

describe("RingDivider", () => {
  it("renders a separator role for assistive tech", () => {
    const { getByRole } = render(<RingDivider />);
    expect(getByRole("separator")).toBeInTheDocument();
  });
});
