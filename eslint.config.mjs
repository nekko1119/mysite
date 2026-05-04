// @ts-check

import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      }
    }
  },
]);
