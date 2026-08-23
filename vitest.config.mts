import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["app/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      reportsDirectory: "coverage",
      include: [
        "app/proxy.ts",
        "app/middleware.ts",
        "app/query-client.tsx",
        "app/**/_services/*.ts",
        "app/**/_hooks/*.ts",
        "app/**/_schemas/*.{ts,tsx}",
        "app/**/_stores/*.ts",
        "app/**/_utilities/*.{ts,tsx}",
        "app/**/_components/*form*.tsx",
        "app/login/page.tsx",
      ],
      exclude: ["app/**/*.test.{ts,tsx}"],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
