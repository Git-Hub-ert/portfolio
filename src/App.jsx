import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/Teal.css';
import './styles/Purple.css';
import './styles/Global.css';
import AppRoutes from './AppRoutes';

// BASE_URL is "/" in production, or the IDE proxy prefix when started with --base.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter basename={basename}>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
