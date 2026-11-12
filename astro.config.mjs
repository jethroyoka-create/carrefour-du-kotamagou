import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// URL du site configurable via variable d'environnement avec valeur de repli Cloudflare Pages
const siteUrl = process.env.PUBLIC_SITE_URL || 'https://carrefour-du-kotamagou.pages.dev';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
