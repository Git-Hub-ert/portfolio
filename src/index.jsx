import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

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
