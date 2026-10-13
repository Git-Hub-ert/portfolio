// Build-time only: renders one route to HTML for scripts/prerender.js. Never shipped to visitors.
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { prerenderToNodeStream } from 'react-dom/static';
import AppRoutes from './AppRoutes';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

export async function render(url) {
  // prerender (unlike renderToString) waits for the lazy-loaded page, so the HTML has real content.
  const { prelude } = await prerenderToNodeStream(
    <HelmetProvider>
      <StaticRouter basename={basename || '/'} location={`${basename}${url}`}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>
  );

  let html = '';
  for await (const chunk of prelude) html += chunk;
  return { html };
}
