import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/Teal.css';
import './styles/Purple.css';
import './styles/Global.css';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';

// Code splitting — each page is only downloaded when first visited
const LandingPage          = lazy(() => import('./pages/LandingPage'));
const ExperiencePage       = lazy(() => import('./pages/ExperiencePage'));
const ContactPage          = lazy(() => import('./pages/ContactPage'));
const SkillsPage           = lazy(() => import('./pages/SkillsPage'));
const CertificationsPage   = lazy(() => import('./pages/CertificationsPage'));
const ProjectsPage         = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage    = lazy(() => import('./pages/ProjectDetailPage'));
const UnderConstructionPage = lazy(() => import('./pages/ConstructionPage'));
const NotFoundPage         = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Navigation />
        <ErrorBoundary>
          <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0f172a' }} />}>
            <Routes>
              <Route path="/"                    element={<LandingPage />} />
              <Route path="/experience"          element={<ExperiencePage />} />
              <Route path="/contact"             element={<ContactPage />} />
              <Route path="/skills"              element={<SkillsPage />} />
              <Route path="/certifications"      element={<CertificationsPage />} />
              <Route path="/projects"            element={<ProjectsPage />} />
              <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
              <Route path="/learn-more"          element={<UnderConstructionPage />} />
              <Route path="*"                    element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

export default App;
