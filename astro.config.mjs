// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://default-creds.hadi.icu",
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [svelte()],
  adapter: node({
    mode: "standalone",
  }),
});
