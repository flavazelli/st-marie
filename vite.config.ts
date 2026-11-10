import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// configure-pages returns /<repo> without a trailing slash. Normalize it before
// both builds so client and SSR agree when joining public asset paths.
const basePath = `${(process.env.BASE_PATH || '/').replace(/\/+$/, '')}/`;
export default defineConfig({
  // GitHub Pages serves project sites from /<repo>/; BASE_PATH is supplied by
  // actions/configure-pages and defaults to / for local development.
  base: basePath,
  plugins: [react()],
  build: { outDir: 'dist', emptyOutDir: true },
});
