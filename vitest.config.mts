import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./test/vitest.setup.ts"],
    root: "./",
    restoreMocks: true,
    coverage: {
      provider: "v8",
      enabled: true,
      reporter: ["html"],
      exclude: ["**/*.d.ts", "**/*.interface.ts"],
    },
  },

  plugins: [
    // This is required to build the test files with SWC
    tsconfigPaths(),
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: "es6" },
    }),
  ],
});
