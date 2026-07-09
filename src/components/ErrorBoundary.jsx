// components/ErrorBoundary.jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '24px',
          color: '#ffffff',
          textAlign: 'center',
          padding: '32px',
        }}>
          <div style={{ fontSize: '64px' }}>⚠️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Something went wrong</h1>
          <p style={{ color: '#94a3b8', maxWidth: '480px', lineHeight: 1.75 }}>
            An unexpected error occurred. Try refreshing the page — if the problem
            persists, feel free to reach out directly.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 32px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Refresh page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}