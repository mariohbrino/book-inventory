import pluginJs from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js: pluginJs },
    extends: ["plugin:js/recommended"],
    languageOptions: { globals: globals.browser },
  },
]);
