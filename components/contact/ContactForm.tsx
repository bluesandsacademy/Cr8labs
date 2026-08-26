"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/contact/actions";

/** Every option list is the copy deck's, verbatim. */
export const ROUTE_OPTIONS = [
  "demo",
  "partner",
  "invest or fund",
  "apply for a role",
  "publish",
  "research",
  "press",
  "something else",
] as const;
const WHERE_OPTIONS = ["schools", "museum", "retail", "event", "headset", "online", "not sure"] as const;
const BUDGET_OPTIONS = ["under $5k", "$5k to $20k", "$20k to $50k", "$50k+", "not sure yet"] as const;

/** `?route=` values (from the site's own links) to the deck's option list. */
export const ROUTE_PARAM_TO_OPTION: Record<string, (typeof ROUTE_OPTIONS)[number]> = {
  demo: "demo",
  partner: "partner",
  fund: "invest or fund",
  join: "apply for a role",
  publish: "publish",
  research: "research",
  press: "press",
};

const INPUT =
  "w-full rounded-[3px] border-[1.5px] border-border bg-bone px-3.5 py-3 font-sans text-[15px] text-ink placeholder:text-disabled focus-ring-light focus:border-adire";
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
      className="focus-ring-light inline-flex items-center gap-3 rounded-[3px] bg-danfo px-6.5 py-3.75 font-sans text-[15px] font-semibold text-ink shadow-[0_10px_24px_-12px_rgba(245,166,35,0.55)] transition-all duration-150 ease-out hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
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
 * The deck's form, every field and option verbatim, submitting to the
 * server action. `initialRoute` preselects "I am here to" from the URL.
 * The thank-you renders in place on success.
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
      <div className="border-l-2 border-success pl-6" role="status">
        <p className="font-display text-[26px] leading-tight text-ink md:text-[32px]">Got it. We are reading it now.</p>
        <p className="mt-4 max-w-120 font-sans text-[16px] leading-relaxed text-body">
          If we need more before we can be useful, we will ask one or two questions rather than send
          the form back.
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

      <Field label="Email" name="email" error={fields.email}>
        <input id="email" name="email" type="email" autoComplete="email" className={INPUT} aria-invalid={!!fields.email} aria-describedby={fields.email ? "email-error" : undefined} />
      </Field>

      <Field label="I am here to" name="route">
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

      <Field label="Tell us what you want people to be able to do" name="message" error={fields.message}>
        <textarea id="message" name="message" rows={6} className={INPUT} aria-invalid={!!fields.message} aria-describedby={fields.message ? "message-error" : undefined} />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Where will this run?" name="where">
          <select id="where" name="where" defaultValue="" className={INPUT}>
            <option value="" disabled>
              Choose one
            </option>
            {WHERE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Timeline" name="timeline">
          <input id="timeline" name="timeline" type="text" placeholder="date, or not fixed" className={INPUT} />
        </Field>
      </div>

      <Field label="Budget range" name="budget">
        <select id="budget" name="budget" defaultValue="" className={INPUT}>
          <option value="" disabled>
            Choose one
          </option>
          {BUDGET_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Anything else, including links" name="extra">
        <textarea id="extra" name="extra" rows={3} className={INPUT} />
      </Field>

      {state.status === "error" && state.message && (
        <p className="border-l-2 border-laterite pl-4 font-sans text-[14px] leading-relaxed text-laterite-text" role="alert">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Submit />
        <p className="max-w-95 font-sans text-[13px] leading-relaxed text-muted">
          We reply within [two] working days. If your project is not right for us we will say so, and
          point you somewhere better.
        </p>
      </div>
    </form>
  );
}
