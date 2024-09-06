import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    alias: {
      // ts-expect-error expect
      "@infra/": new URL("./src/infra/", import.meta.url).pathname,
      // ts-expect-error expect
      "@domain/": new URL("./src/domain/", import.meta.url).pathname,
      // ts-expect-error expect
      "@application/": new URL("./src/application/", import.meta.url).pathname,
      // ts-expect-error expect
      "@test/": new URL("./test/", import.meta.url).pathname,
    },
    root: "./",
  },
  resolve: {
    alias: {
      // ts-expect-error expect
      "@infra/": new URL("./src/infra/", import.meta.url).pathname,
      // ts-expect-error expect
      "@domain/": new URL("./src/domain/", import.meta.url).pathname,
      // ts-expect-error expect
      "@application/": new URL("./src/application/", import.meta.url).pathname,
      // ts-expect-error expect
      "@test/": new URL("./test/", import.meta.url).pathname,
    },
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: "es6" },
    }),
  ],
});
