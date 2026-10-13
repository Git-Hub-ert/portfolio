// Vitest global setup: prerender every route in this Node process, outside the jsdom
// test workers. Rendering on the server and hydrating in the same realm would leak
// React context between the two renderers and make the test meaningless.
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';
import { routes } from '../../scripts/routes.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export default async function setup({ provide }) {
  const outDir = path.join(root, 'node_modules', '.cache', 'ssr-test');
  await build({
    root,
    logLevel: 'silent',
    // No inlining, so every image keeps a URL the test can map back to its source file.
    build: { ssr: 'src/entry-server.jsx', outDir, emptyOutDir: true, assetsInlineLimit: 0 },
  });
  const { render } = await import(`${pathToFileURL(path.join(outDir, 'entry-server.js')).href}?t=${Date.now()}`);

  const pages = {};
  for (const route of routes) pages[route.url] = (await render(route.url)).html;
  provide('prerendered', pages);
}
