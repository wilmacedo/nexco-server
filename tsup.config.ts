import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src", "!src/**/*.http"],
  clean: true,
});
