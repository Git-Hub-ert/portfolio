// Guards G-01: each prerendered page must hydrate without a mismatch. Otherwise React
// throws the server HTML away and re-renders, causing a visible flash.
import React, { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { inject, vi } from 'vitest';
import { routes, splitHead } from '../scripts/routes.js';
import App from './App';

const pages = inject('prerendered');

// The SSR build references hashed images (/assets/BirdzLogo-1a2b.png) while the test runs
// from source (/src/assets/.../BirdzLogo.png). Map one to the other so only real
// differences are reported.
const sourceImages = import.meta.glob('./assets/**/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' });
const toSourceUrls = (html) =>
  html.replace(/\/assets\/([\w-]+?)-[\w-]{8}\.(\w+)/g, (built, name, ext) =>
    Object.values(sourceImages).find((url) => url.endsWith(`/${name}.${ext}`)) ?? built);
// 404.html is rendered for unknown paths and is never hydrated (see index.jsx).
const hydratedRoutes = routes.filter((r) => !r.file).map((r) => r.url);

describe.each(hydratedRoutes)('prerendered %s', (url) => {
  test('hydrates without mismatch', async () => {
    const { body } = splitHead(toSourceUrls(pages[url]));
    window.history.replaceState(null, '', url);
    const container = document.createElement('div');
    container.innerHTML = body;
    document.body.appendChild(container);

    const errors = [];
    // React reports some mismatches (attributes, for example) only through console.error.
    const consoleError = vi.spyOn(console, 'error').mockImplementation((...args) => errors.push(args.join(' ')));
    let root;
    await act(async () => {
      root = hydrateRoot(container, <App />, {
        onRecoverableError: (error) => errors.push(error.message),
      });
    });
    // Let the lazy page chunk load and hydration finish.
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 50)); });

    consoleError.mockRestore();
    expect(errors).toEqual([]);
    root.unmount();
    container.remove();
  });
});
