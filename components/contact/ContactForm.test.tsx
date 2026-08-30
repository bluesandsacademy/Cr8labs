import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";
import type { ContactState } from "@/app/contact/actions";

describe("ContactForm", () => {
  it("renders every field and option from the site's own list", () => {
    render(<ContactForm />);
    for (const label of ["Name", "Organisation", "Email", "Phone", "I am contacting about", "Tell us about your project"]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    for (const option of [
      "A commissioned project",
      "Buying products for a school",
      "Institutional or bulk order",
      "Partnership or licensing",
      "Investment",
      "Press",
      "Something else",
    ]) {
      expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
    }
    expect(screen.getByText("We reply to every enquiry within two working days.")).toBeInTheDocument();
  });

  it("preselects the route it is given", () => {
    render(<ContactForm initialRoute="Partnership or licensing" />);
    expect(screen.getByLabelText("I am contacting about")).toHaveValue("Partnership or licensing");
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

  it("shows the confirmation message in place on success", async () => {
    const action = async (): Promise<ContactState> => ({ status: "success" });
    render(<ContactForm action={action} />);
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(
      await screen.findByText("Thank you. We reply to every enquiry within two working days.")
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Send" })).not.toBeInTheDocument();
  });

  it("shows the send-failure copy when delivery fails", async () => {
    const action = async (): Promise<ContactState> => ({
      status: "error",
      message: "That did not send. Try again, or write to cr8labtech@gmail.com and we will pick it up from there.",
    });
    render(<ContactForm action={action} />);
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(await screen.findByText(/That did not send\./)).toBeInTheDocument();
  });
});
