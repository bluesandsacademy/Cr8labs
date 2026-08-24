import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      // next/font/* modules are empty at runtime outside Next's own compiler
      // (see test/mocks/next-font-*.ts for why); stand in with mocks for tests.
      "next/font/google": path.resolve(__dirname, "./test/mocks/next-font-google.ts"),
      "next/font/local": path.resolve(__dirname, "./test/mocks/next-font-local.ts"),
    },
  },
});
