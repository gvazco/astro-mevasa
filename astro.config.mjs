import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { loadEnv } from "vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
const { PUBLIC_WP_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  image: {
    domains: [PUBLIC_WP_URL],
  },
  site: "https://www.techosymantenimientos.com",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    robotsTxt(),
    sitemap(),
  ],
  output: "hybrid",
  adapter: vercel(),
});
