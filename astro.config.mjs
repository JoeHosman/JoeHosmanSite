import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import { normalizeBase } from "./src/lib/urls.mjs";
import siteUrls from "./src/plugins/rehype-site-urls.mjs";
import { validateContentSources } from "./src/lib/validate-source.ts";
import { fileURLToPath } from "node:url";

const base = normalizeBase(process.env.SITE_BASE ?? "/");
export default defineConfig({
  output: "static",
  site: process.env.SITE_URL || undefined,
  base,
  trailingSlash: "always",
  integrations: [
    {
      name: "validate-source-frontmatter",
      hooks: {
        "astro:config:setup": ({ config }) =>
          validateContentSources(fileURLToPath(config.root)),
      },
    },
  ],
  markdown: { processor: unified({ rehypePlugins: [[siteUrls, { base }]] }) },
});
