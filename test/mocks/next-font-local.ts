// See next-font-google.ts for why this mock exists: next/font/local's real
// module is empty at runtime and only works through Next's own compiler.

type LocalFontOptions = {
  src?: unknown;
  variable?: string;
  display?: string;
};

export default function localFont(options: LocalFontOptions = {}) {
  return {
    className: "__mock_local_font",
    variable: options.variable ?? "--font-local",
    style: { fontFamily: "mock-local-font" },
  };
}
