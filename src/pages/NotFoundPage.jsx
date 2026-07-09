// NotFoundPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="construction-container">
      <Helmet>
        <title>Page Not Found | Hubert de Tournay</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="construction-bg-container">
        <div className="float construction-blob-1" />
        <div className="float construction-blob-2" />
      </div>

      <div className="construction-content">
        <div className="construction-icon">404</div>
        <h1 className="construction-title">Page Not Found</h1>
        <p className="construction-description">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          className="btn-primary"
          onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
        >
          <ArrowLeft size={20} style={{ marginRight: '8px' }} />
          Back to Home
        </button>
      </div>
    </div>
  );
}