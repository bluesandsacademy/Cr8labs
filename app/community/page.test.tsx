import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CommunityPage from "./page";

describe("Community page", () => {
  it("opens with the deck's hero", () => {
    render(<CommunityPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "The next generation should be building this, not just using it"
    );
    expect(screen.getByText(/Free to join unless stated otherwise\./)).toBeInTheDocument();
  });

  it("renders all nine programmes with their brackets intact", () => {
    render(<CommunityPage />);
    for (const title of [
      "Hackathons",
      "Challenges",
      "Student Creators",
      "Teacher Ambassadors",
      "University Partnerships",
      "Open Innovation",
      "Creator Grants",
      "Innovation Labs",
      "Youth Programmes",
    ]) {
      expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    }
    expect(screen.getByText(/Next edition: \[date, city\]\./)).toBeInTheDocument();
    expect(screen.getByText(/Free places reserved for \[X\] percent of every cohort\./)).toBeInTheDocument();
  });

  it("closes with the deck's join line", () => {
    render(<CommunityPage />);
    expect(screen.getByText(/Join as a student, a teacher, a university or a creator/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Join the community" })).toBeInTheDocument();
  });
});
