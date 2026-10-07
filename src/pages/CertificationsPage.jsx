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
      helmetTitle="Certifications & Training | Hubert de Tournay"
      helmetDescription="Certifications and training completed by Hubert de Tournay: Tenacy Certified User, ANSSI SecNumacadémie, Cisco Introduction to Cybersecurity and more."
      helmetCanonical="https://www.de-tournay.fr/certifications"
      // Layout
      containerClass="certifications-container"
      sectionClass="certifications-section"
      gridClass="certifications-grid"
      // Hero
      heroTitle="Certifications & Training"
      introduction="The certifications, training courses and awareness programs I have completed. Each item is labeled by type, so you can tell a certification earned through an exam from a course I followed."
      // Data
      data={certificationsData}
      categories={categories}
      // Labels
      categorySectionTitle="Categories"
      networkTitle="Certifications & Training Map"
      networkDescription="Interactive map of how my certifications and training courses relate. Click on any bubble to highlight its connections."
      getCountLabel={(count) => `${count} item${count !== 1 ? 's' : ''}`}
      getDisplayedTitle={(selectedItem, selectedCategory) =>
        selectedItem     ? selectedItem.name
        : selectedCategory ? `${selectedCategory} Certifications & Training`
        : 'All Certifications & Training'
      }
      // Render props
      renderCard={(cert, isActive, onSelect) => (
        <div
          key={cert.id}
          className={`cert-card ${isActive ? 'active' : ''}`}
          onClick={onSelect}
        >
          <div className="cert-card-header">
            <div className="cert-badges">
              <div
                className="category-badge"
                style={{ backgroundColor: categories.find(c => c.name === cert.category)?.color || '#60a5fa' }}
              >
                {cert.category}
              </div>
              <span className={`cert-type-badge cert-type-badge--${cert.type.toLowerCase()}`}>
                {cert.type}
              </span>
            </div>
            <span className="cert-date">{cert.obtained}</span>
          </div>

          <h3 className="cert-name">{cert.name}</h3>
          <p className="cert-issuer">{cert.issuer}</p>
          <p className="cert-summary">{cert.summary}</p>

          {cert.connections.length > 0 && (
            <div className="connections-container">
              <p className="cert-label">Related:</p>
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