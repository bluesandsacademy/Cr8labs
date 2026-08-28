import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PageBackground } from "./PageBackground";

describe("PageBackground", () => {
  it("renders no headset image; there is no dive anymore", () => {
    render(<PageBackground />);
    expect(document.querySelector('img[src*="hero-headset"]')).toBeNull();
  });

  it("sets the nav tone on the document root and clears it on unmount", () => {
    const { unmount } = render(<PageBackground />);
    expect(document.documentElement.dataset.tone).toBe("dark");
    unmount();
    expect(document.documentElement.dataset.tone).toBeUndefined();
  });
});
