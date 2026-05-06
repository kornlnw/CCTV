import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://trustcambro.com",
  base: "/blog",
  trailingSlash: "ignore",
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
  build: { format: "directory" },
  markdown: {
    shikiConfig: { theme: "github-light", wrap: true },
  },
});
