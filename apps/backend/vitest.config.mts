import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  test: {
    projects: [
      {
        root,
        resolve: {
          alias: {
            "@": path.resolve(root, "./src/module/user"),
            "@shared": path.resolve(root, "./src/module/shared"),
          },
        },
        test: {
          name: "user",
          include: ["src/module/user/**/*.test.ts"],
        },
      },
      {
        root,
        resolve: {
          alias: {
            "@": path.resolve(root, "./src/module/shared"),
            "@shared": path.resolve(root, "./src/module/shared"),
          },
        },
        test: {
          name: "shared",
          include: ["src/module/shared/**/*.test.ts"],
        },
      },
    ],
  },
});
