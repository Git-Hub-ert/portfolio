// Every URL the site serves, shared by the prerender script, the sitemap and the hydration test.
import projectsData from '../src/data/Projects.js';

export const routes = [
  { url: '/', sitemap: true },
  { url: '/experience/', sitemap: true },
  { url: '/skills/', sitemap: true },
  { url: '/certifications/', sitemap: true },
  { url: '/projects/', sitemap: true },
  ...projectsData.map((p) => ({ url: `/projects/${p.id}/`, sitemap: true })),
  { url: '/contact/', sitemap: true },
  // Hidden placeholder (LM-01): kept reachable for old links, not listed.
  { url: '/learn-more/', sitemap: false },
  // GitHub Pages serves 404.html, with a real 404 status, for any unknown path.
  { url: '/404', file: '404.html', sitemap: false },
];

// React 19 emits the page's <title>, <meta> and <link> tags first; split them from the body
// so they can go into <head>. They are tagged so the browser entry can drop them before
// React adds its own copies.
export function splitHead(html) {
  const tag = /^(<title[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>)/;
  const head = [];
  let rest = html;
  let match;
  while ((match = rest.match(tag))) {
    head.push(match[1].replace(/^<(\w+)/, '<$1 data-prerendered'));
    rest = rest.slice(match[1].length);
  }
  return { head: head.join('\n    '), body: rest };
}
