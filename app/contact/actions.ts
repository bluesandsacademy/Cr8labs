"use server";

import { Resend } from "resend";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fields?: Record<string, string> };

/** The copy deck's own form error. */
const SEND_FAILED =
  "That did not send. Try again, or write to hello@cr8lab.com and we will pick it up from there.";

/** The deck's thank-you copy, sent to the person who wrote in. */
const THANK_YOU =
  "Got it. We are reading it now. If we need more before we can be useful, we will ask one or two questions rather than send the form back.";

const FIELDS = [
  "name",
  "organisation",
  "email",
  "route",
  "message",
  "where",
  "timeline",
  "budget",
  "extra",
] as const;

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Spam: a field no person sees, and a form that was filled in under three seconds.
  if (text(formData, "website")) return { status: "success" };
  const startedAt = Number(formData.get("startedAt"));
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < 3000) {
    return { status: "success" };
  }

  const values = Object.fromEntries(FIELDS.map((f) => [f, text(formData, f)])) as Record<
    (typeof FIELDS)[number],
    string
  >;

  const fields: Record<string, string> = {};
  if (!values.name) fields.name = "Required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) fields.email = "Enter an email address.";
  if (!values.message) fields.message = "Required.";
  if (Object.keys(fields).length) return { status: "error", message: "", fields };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    // A misconfigured deploy fails loudly, and the submission is not lost.
    console.error("[contact] delivery not configured; submission follows", {
      name: values.name,
      organisation: values.organisation,
      email: values.email,
      route: values.route,
    });
    return { status: "error", message: SEND_FAILED };
  }

  const resend = new Resend(apiKey);
  const body = FIELDS.map((f) => `${f}: ${values[f] || "(blank)"}`).join("\n");

  try {
    const submission = await resend.emails.send({
      from,
      to,
      replyTo: values.email,
      subject: `Contact: ${values.route || "something else"} from ${values.name}${
        values.organisation ? ` (${values.organisation})` : ""
      }`,
      text: body,
    });
    if (submission.error) throw submission.error;

    // The sender's copy is best effort; the submission has already arrived.
    await resend.emails.send({
      from,
      to: values.email,
      subject: "CR8LAB: got it",
      text: THANK_YOU,
    });

    return { status: "success" };
  } catch (error) {
    console.error("[contact] send failed", error);
    return { status: "error", message: SEND_FAILED };
  }
}
