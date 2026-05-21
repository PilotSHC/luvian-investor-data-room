import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://data-room.luvian.info',
  output: 'server',
  adapter: vercel(),
  // Our auth cookie is HttpOnly + SameSite=Lax + HMAC-signed, which is the
  // correct CSRF defense for a single-shared-password gate served behind
  // multiple hostnames (data-room.luvian.info, *.vercel.app, branch alias).
  // Astro v5's built-in Origin check breaks under multi-host deployments
  // because it compares Origin to the request's Host on each ingress URL.
  security: {
    checkOrigin: false,
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
