"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/contact/actions";

import { ROUTE_OPTIONS } from "./route-options";

const INPUT =
  "w-full rounded-2xl border-[1.5px] border-border bg-white px-3.5 py-3 font-sans text-[15px] text-ink placeholder:text-disabled focus-ring-light focus:border-adire";
const LABEL = "mb-2 block font-sans text-[13px] font-semibold text-ink";
const ERROR = "mt-2 font-sans text-[12px] text-laterite-text";

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className={LABEL}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className={ERROR} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring-light inline-flex items-center gap-3 rounded-2xl bg-danfo px-6.5 py-3.75 font-display text-[15px] font-bold text-ink shadow-[0_6px_0_var(--color-adire-dark)] transition-all duration-150 ease-out hover:translate-y-[3px] hover:shadow-[0_3px_0_var(--color-adire-dark)] disabled:translate-y-0 disabled:opacity-70"
    >
      {pending && (
        <span
          className="h-4 w-4 rounded-full border-2 border-ink/20 border-t-ink motion-safe:animate-[orbit_900ms_linear_infinite]"
          aria-hidden="true"
        />
      )}
      {pending ? "Sending" : "Send"}
    </button>
  );
}

/**
 * The site's own form: Name, Organisation, Email, Phone, "I am contacting
 * about", "Tell us about your project". `initialRoute` preselects the
 * dropdown from the URL. The confirmation renders in place on success.
 */
export function ContactForm({
  initialRoute,
  action = submitContact,
}: {
  initialRoute?: (typeof ROUTE_OPTIONS)[number];
  action?: (prev: ContactState, formData: FormData) => Promise<ContactState>;
}) {
  const [state, formAction] = useActionState(action, { status: "idle" } as ContactState);
  // Stamped after mount, straight onto the input, so the server render and the
  // first client render agree and no state update is needed.
  const startedAtRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  if (state.status === "success") {
    return (
      <div className="rounded-[1.8rem] border-4 border-danfo bg-bone p-7 lg:p-9" role="status">
        <p className="font-display text-[26px] leading-tight text-ink md:text-[32px]">
          Thank you. We reply to every enquiry within two working days.
        </p>
      </div>
    );
  }

  const fields = state.status === "error" ? state.fields ?? {} : {};

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="0" />
      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="absolute -left-[9999px] top-0" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" error={fields.name}>
          <input id="name" name="name" type="text" autoComplete="name" className={INPUT} aria-invalid={!!fields.name} aria-describedby={fields.name ? "name-error" : undefined} />
        </Field>
        <Field label="Organisation" name="organisation">
          <input id="organisation" name="organisation" type="text" autoComplete="organization" className={INPUT} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Email" name="email" error={fields.email}>
          <input id="email" name="email" type="email" autoComplete="email" className={INPUT} aria-invalid={!!fields.email} aria-describedby={fields.email ? "email-error" : undefined} />
        </Field>
        <Field label="Phone" name="phone">
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={INPUT} />
        </Field>
      </div>

      <Field label="I am contacting about" name="route">
        <select id="route" name="route" defaultValue={initialRoute ?? ""} className={INPUT}>
          <option value="" disabled>
            Choose one
          </option>
          {ROUTE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Tell us about your project" name="message" error={fields.message}>
        <textarea id="message" name="message" rows={6} className={INPUT} aria-invalid={!!fields.message} aria-describedby={fields.message ? "message-error" : undefined} />
      </Field>

      {state.status === "error" && state.message && (
        <p className="border-l-2 border-laterite pl-4 font-sans text-[14px] leading-relaxed text-laterite-text" role="alert">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Submit />
        <p className="max-w-95 font-sans text-[13px] leading-relaxed text-muted">
          We reply to every enquiry within two working days.
        </p>
      </div>
    </form>
  );
}
