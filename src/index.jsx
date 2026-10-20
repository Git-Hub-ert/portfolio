import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// After a deploy, the hashed page chunks of the previous build are gone. A visitor who
// still has the old version open gets a failed dynamic import on the next page: reload
// once to fetch the new build instead of showing the error screen (G-18).
const RELOAD_KEY = 'chunk-reload-at';
window.addEventListener('vite:preloadError', (event) => {
  try {
    const lastReload = Number(sessionStorage.getItem(RELOAD_KEY)) || 0;
    // A chunk that is still missing right after a reload is a real error, not a deploy:
    // let it reach the ErrorBoundary rather than loop.
    if (Date.now() - lastReload < 10_000) return;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Without storage we cannot guard against a reload loop, so do not reload at all.
    return;
  }
  event.preventDefault();
  window.location.reload();
});

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const normalize = (p) => p.replace(/\/+$/, '') || '/';

// Old links used HashRouter (e.g. /#/experience). Send them to the real page instead.
if (window.location.hash.startsWith('#/')) {
  window.location.replace(`${base}${window.location.hash.slice(1)}`);
} else {
  const container = document.getElementById('root');
  const app = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // React 19 manages <title>/<meta> itself; drop the prerendered copies to avoid duplicates.
  document.head.querySelectorAll('[data-prerendered]').forEach((el) => el.remove());

  const prerenderedRoute = container.dataset.route;
  const currentRoute = normalize(window.location.pathname.slice(base.length));

  if (prerenderedRoute && normalize(prerenderedRoute) === currentRoute) {
    // The HTML for this exact page is already there: attach to it.
    ReactDOM.hydrateRoot(container, app);
  } else {
    // Dev server, or 404.html served for another path: render from scratch.
    container.replaceChildren();
    ReactDOM.createRoot(container).render(app);
  }
}
