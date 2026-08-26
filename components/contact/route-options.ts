/**
 * The contact form's route options and the `?route=` mapping, in a plain
 * module with no "use client" directive. Both the server page (which reads
 * the URL) and the client form import from here. Inside a client module
 * these would reach the server as opaque client references and the lookup
 * would silently return undefined; that is exactly what happened before.
 */

/** Every option is the copy deck's, verbatim. */
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

export type RouteOption = (typeof ROUTE_OPTIONS)[number];

/** `?route=` values (from the site's own links) to the deck's option list. */
export const ROUTE_PARAM_TO_OPTION: Record<string, RouteOption> = {
  demo: "demo",
  partner: "partner",
  fund: "invest or fund",
  join: "apply for a role",
  publish: "publish",
  research: "research",
  press: "press",
};
