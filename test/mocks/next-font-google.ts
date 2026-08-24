// next/font/google's real module is empty at runtime: Next's Turbopack/webpack
// compiler intercepts the import at build time and injects the actual font
// loading code. Under plain Vite/Vitest there is no such interception, so this
// mock stands in for it in tests, aliased from vitest.config.ts. Add a line
// here for each new Google font name imported anywhere in the app.

type GoogleFontOptions = {
  variable?: string;
  weight?: string | string[];
  subsets?: string[];
  display?: string;
};

function createGoogleFontMock(name: string) {
  return (options: GoogleFontOptions = {}) => ({
    className: `__mock_${name}`,
    variable: options.variable ?? `--font-${name.toLowerCase()}`,
    style: { fontFamily: name },
  });
}

export const Ojuju = createGoogleFontMock("Ojuju");
export const JetBrains_Mono = createGoogleFontMock("JetBrains_Mono");
