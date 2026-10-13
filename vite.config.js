import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Only for previewing a production build behind the IDE proxy; never set when deploying.
  base: process.env.PREVIEW_BASE || '/',
  plugins: [react()],
  server: {
    // IPv4 loopback: reachable by a local reverse proxy, but not exposed to the network
    // (unlike --host / 0.0.0.0).
    host: '127.0.0.1',
    // Fail instead of silently moving to another port the proxy doesn't know about.
    strictPort: true,
  },
  build: {
    // Keep CRA's folder name so the existing gh-pages deploy script is unchanged.
    outDir: 'build',
    // Source maps would publish the full source with every deploy (G-12).
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    globalSetup: './src/test/prerenderSetup.js',
    css: false,
  },
});