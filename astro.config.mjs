// @ts-check

import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

const isE2E = process.env.E2E === "true";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://nekko1119.org",
  integrations: [icon()],
  devToolbar: {
    enabled: !isE2E,
  },
});
