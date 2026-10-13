// Single source of truth for public URLs. GitHub Pages serves the apex domain
// (www.de-tournay.fr redirects to de-tournay.fr), so every canonical URL uses it.
export const SITE_URL = 'https://de-tournay.fr';

// Pages are prerendered as folder/index.html, which GitHub Pages serves at "/folder/".
// Canonical URLs must use the trailing slash, or they point at a redirect.
export const pageUrl = (path) => `${SITE_URL}${path === '/' ? '/' : `${path.replace(/\/$/, '')}/`}`;
