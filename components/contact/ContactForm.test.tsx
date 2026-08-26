import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";
import type { ContactState } from "@/app/contact/actions";

describe("ContactForm", () => {
  it("renders every field and option list from the deck", () => {
    render(<ContactForm />);
    for (const label of [
      "Name",
      "Organisation",
      "Email",
      "I am here to",
      "Tell us what you want people to be able to do",
      "Where will this run?",
      "Timeline",
      "Budget range",
      "Anything else, including links",
    ]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    for (const option of ["invest or fund", "apply for a role", "something else", "headset", "not sure", "$20k to $50k", "not sure yet"]) {
      expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
    }
    expect(screen.getByText(/We reply within \[two\] working days\./)).toBeInTheDocument();
  });

  it("preselects the route it is given", () => {
    render(<ContactForm initialRoute="partner" />);
    expect(screen.getByLabelText("I am here to")).toHaveValue("partner");
  });

  it("shows field errors returned by the action", async () => {
    const action = async (): Promise<ContactState> => ({
      status: "error",
      message: "",
      fields: { name: "Required.", email: "Enter an email address." },
    });
    render(<ContactForm action={action} />);
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(await screen.findByText("Required.")).toBeInTheDocument();
    expect(screen.getByText("Enter an email address.")).toBeInTheDocument();
  });

  it("shows the deck's thank-you in place on success", async () => {
    const action = async (): Promise<ContactState> => ({ status: "success" });
    render(<ContactForm action={action} />);
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(await screen.findByText("Got it. We are reading it now.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Send" })).not.toBeInTheDocument();
  });

  it("shows the deck's send-failure copy when delivery fails", async () => {
    const action = async (): Promise<ContactState> => ({
      status: "error",
      message: "That did not send. Try again, or write to hello@cr8lab.com and we will pick it up from there.",
    });
    render(<ContactForm action={action} />);
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(await screen.findByText(/That did not send\./)).toBeInTheDocument();
  });
});
