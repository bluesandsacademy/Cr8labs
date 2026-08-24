import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlatformModules } from "./PlatformModules";

describe("PlatformModules", () => {
  it("renders the section heading and intro", () => {
    render(<PlatformModules />);
    expect(screen.getByRole("heading", { level: 2, name: "One platform. Many worlds." })).toBeInTheDocument();
    expect(
      screen.getByText(
        "A printed page, a phone, a headset, a classroom display and a cloud that remembers what each learner did. Eight parts, built to work together and built to work alone."
      )
    ).toBeInTheDocument();
  });

  it("renders all eight modules by name", () => {
    render(<PlatformModules />);
    for (const name of [
      "Interactive Books",
      "AR Experiences",
      "VR Learning",
      "Virtual Science Labs",
      "AI Learning Companion",
      "Teacher Studio",
      "Creator Platform",
      "Analytics",
    ]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });

  it("renders the CTA", () => {
    render(<PlatformModules />);
    expect(
      screen.getByRole("link", { name: "See how the platform fits together" })
    ).toBeInTheDocument();
  });
});
