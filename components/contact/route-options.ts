/**
 * The contact form's route options and the `?route=` mapping, in a plain
 * module with no "use client" directive. Both the server page (which reads
 * the URL) and the client form import from here. Inside a client module
 * these would reach the server as opaque client references and the lookup
 * would silently return undefined; that is exactly what happened before.
 */

/** Every option is the site's own dropdown list for "I am contacting about", verbatim. */
export const ROUTE_OPTIONS = [
  "A commissioned project",
  "Buying products for a school",
  "Institutional or bulk order",
  "Partnership or licensing",
  "Investment",
  "Press",
  "Something else",
] as const;

export type RouteOption = (typeof ROUTE_OPTIONS)[number];

/** `?route=` values (from the site's own links) to the dropdown's option list. */
export const ROUTE_PARAM_TO_OPTION: Record<string, RouteOption> = {
  demo: "A commissioned project",
  partner: "Partnership or licensing",
  fund: "Investment",
  school: "Buying products for a school",
  bulk: "Institutional or bulk order",
  press: "Press",
};
