import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductsPage from "./page";

const NAMES = [
  "CR8LAB Books",
  "CR8LAB AR",
  "CR8LAB VR",
  "CR8LAB Labs",
  "CR8LAB AI",
  "CR8LAB Studio",
  "CR8LAB Creator",
  "CR8LAB Library",
];

describe("Products page", () => {
  it("opens with the deck's hero", () => {
    render(<ProductsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Eight products. One library. One account.");
  });

  it("renders all eight products with their calls to action", () => {
    render(<ProductsPage />);
    for (const name of NAMES) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
    for (const label of [
      "See the catalogue",
      "Start an AR project",
      "Explore VR",
      "See the experiment library",
      "How our AI works",
      "Try Studio",
      "See what students have built",
      "Licence from the library",
    ]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("opens with a shop window of eight tiles that link down to their products", () => {
    render(<ProductsPage />);
    for (const slug of ["books", "ar", "vr", "labs", "ai", "studio", "creator", "library"]) {
      const tile = document.querySelector(`a[href="#${slug}"]`);
      expect(tile).not.toBeNull();
      expect(document.getElementById(slug)).not.toBeNull();
    }
  });

  it("renders who each product is for as scannable chips, verbatim from the deck", () => {
    render(<ProductsPage />);
    expect(screen.getByText("homeschooling families")).toBeInTheDocument();
    expect(screen.getByText("technical and vocational training")).toBeInTheDocument();
    expect(screen.getByText("publishers and studios who licence assets directly")).toBeInTheDocument();
  });

  it("keeps the hardware strip to two items and never mentions the Smart Blackboard", () => {
    render(<ProductsPage />);
    expect(screen.getByText("Virtual Science Lab tablet")).toBeInTheDocument();
    expect(screen.getByText("Spotty camera and book holder")).toBeInTheDocument();
    expect(screen.queryByText(/Smart Blackboard/i)).not.toBeInTheDocument();
  });

  it("keeps the deck's brackets verbatim", () => {
    render(<ProductsPage />);
    expect(screen.getByText(/Runs offline on a \[\$150\] tablet, device included/)).toBeInTheDocument();
    expect(screen.getByText(/\[Language support: English, plus \[Yoruba, Hausa, Igbo, Kiswahili\] on the roadmap\]/)).toBeInTheDocument();
  });
});
