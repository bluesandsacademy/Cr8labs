import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RingList } from "./RingList";

describe("RingList", () => {
  it("renders every item as a list item, in order", () => {
    render(<RingList items={["One", "Two", "Three"]} />);
    const items = screen.getAllByRole("listitem");
    expect(items.map((li) => li.textContent)).toEqual(["One", "Two", "Three"]);
  });
});
