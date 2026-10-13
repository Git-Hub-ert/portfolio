// Runs after `vite build`: writes one real HTML file per route so crawlers and link
// previews get each page's content and meta tags, with a 200 status on GitHub Pages.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { routes, splitHead } from './routes.js';
import { pageUrl } from '../src/data/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'build');
const ssrDir = path.join(root, 'build-ssr');
const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const template = await fs.readFile(path.join(outDir, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing the <!--app-head--> marker or the empty #root div.');
}

for (const route of routes) {
  const { html } = await render(route.url);
  const { head, body } = splitHead(html);
  const page = template
    .replace('<!--app-head-->', head)
    .replace('<div id="root"></div>', `<div id="root" data-route="${route.url}">${body}</div>`);

  const target = path.join(outDir, route.file ?? path.join(route.url, 'index.html'));
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, page);
  console.log(`prerendered ${route.url} -> ${path.relative(root, target)}`);
}

// Generated from the same route list, so the sitemap can't drift from the real pages (G-03).
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.filter((r) => r.sitemap).map((r) => `  <url><loc>${pageUrl(r.url)}</loc></url>`).join('\n')}
</urlset>
`;
await fs.writeFile(path.join(outDir, 'sitemap.xml'), sitemap);
console.log('wrote build/sitemap.xml');

await fs.rm(ssrDir, { recursive: true, force: true });
