/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "**/@wp-block-tools/styles/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: "var(--wp--preset--font-family--acme)",
      },
      colors: {
        "slate-steel-color": "var(--wp--preset--color--slate-steel-color)",
        "slate-steel-color-hover":
          "var(--wp--preset--color--slate-steel-color-hover)",
        "green-teal-tym": "var(--wp--preset--color--green-teal-tym)",
        "green-teal-tym-hover":
          "var(--wp--preset--color--green-teal-tym-hover)",
        "amber-yellow": "var(--wp--preset--color--amber-yellow)",
        "amber-yellow-hover": "var(--wp--preset--color--amber-yellow-hover)",
        "event-horizon": "var(--color--event-horizon)",
        "blast-off": "var(--color--blast-off)",
      },
    },
  },
  plugins: [],
};
