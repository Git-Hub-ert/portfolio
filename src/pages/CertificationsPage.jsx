// CertificationsPage.jsx
import React from 'react';
import NetworkPage from '../components/NetworkPage';
import certificationsData from '../data/Certifications.js';

const categories = [
  { name: 'Security',     color: '#f87171' },
  { name: 'Cloud',        color: '#38bdf8' },
  { name: 'Development',  color: '#8b5cf6' },
  { name: 'DevOps',       color: '#34d399' },
  { name: 'Data',         color: '#fbbf24' },
  { name: 'Architecture', color: '#a78bfa' },
  { name: 'Other',        color: '#94a3b8' },
];

export default function CertificationsPage() {
  return (
    <NetworkPage
      // Helmet
      helmetTitle="Certifications | Hubert de Tournay"
      helmetDescription="Cybersecurity, cloud, and IT certifications earned by Hubert de Tournay, including ANSSI, Fortinet, and CISSP-oriented training."
      helmetCanonical="https://www.de-tournay.fr/certifications"
      // Layout
      containerClass="certifications-container"
      sectionClass="certifications-section"
      gridClass="certifications-grid"
      // Hero
      heroTitle="My Certifications"
      introduction="A collection of certifications that validate my expertise across various domains. Each certification represents dedicated learning and hands-on experience in its respective field."
      // Data
      data={certificationsData}
      categories={categories}
      // Labels
      categorySectionTitle="Certification Categories"
      networkTitle="Certifications Network Map"
      networkDescription="Interactive map of how my certifications connect and relate. Click on any certification bubble to highlight its connections."
      getCountLabel={(count) => `${count} certification${count !== 1 ? 's' : ''}`}
      getDisplayedTitle={(selectedItem, selectedCategory) =>
        selectedItem     ? selectedItem.name
        : selectedCategory ? `${selectedCategory} Certifications`
        : 'All Certifications'
      }
      // Render props
      renderCard={(cert, isActive, onSelect) => (
        <div
          key={cert.id}
          className={`cert-card ${isActive ? 'active' : ''}`}
          onClick={onSelect}
        >
          <div className="cert-card-header">
            <div
              className="category-badge"
              style={{ backgroundColor: categories.find(c => c.name === cert.category)?.color || '#60a5fa' }}
            >
              {cert.category}
            </div>
            <span className="cert-date">{cert.obtained}</span>
          </div>

          <h3 className="cert-name">{cert.name}</h3>
          <p className="cert-summary">{cert.summary}</p>

          {cert.connections.length > 0 && (
            <div className="connections-container">
              <p className="cert-label">Related Certifications:</p>
              <div className="connections-tags">
                {cert.connections.map(connId => {
                  const connCert = certificationsData.find(c => c.id === connId);
                  return (
                    <span key={connId} className="connection-tag">
                      {connCert?.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      renderSelectedLegend={(cert) => (
        <div className="selected-cert-info">
          <strong>Selected: {cert.name}</strong>
          <p>
            Connections:{' '}
            {cert.connections
              .map(id => certificationsData.find(c => c.id === id)?.name)
              .filter(Boolean)
              .join(', ') || 'None'}
          </p>
        </div>
      )}
    />
  );
}