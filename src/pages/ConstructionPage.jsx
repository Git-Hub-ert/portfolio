// ConstructionPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Linkedin, Github } from 'lucide-react';

export default function UnderConstructionPage() {
  const contactLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/hubert-de-tournay/' },
    { icon: Github,   label: 'GitHub',   href: 'https://github.com/Git-Hub-ert' },
  ];

  return (
    <div className="construction-container">
      {/* Hidden placeholder (LM-01): kept reachable for old links, but kept out of search results until it becomes the About page. */}
      <Helmet>
        <title>Learn More | Hubert de Tournay</title>
        <meta
          name="description"
          content="More about Hubert de Tournay — studies, hobbies, and background. Page under construction."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="construction-bg-container">
        <div className="float construction-blob-1" />
        <div className="float construction-blob-2" />
      </div>

      <div className="construction-content">
        <div className="construction-icon">🚧</div>
        <h1 className="construction-title">Under Construction</h1>
        <p className="construction-subtitle">Something amazing is coming soon!</p>
        <p className="construction-description">
          I'm currently working on this page to make it even better.
          Check back soon for updates and exciting new content.
        </p>

        <div className="progress-container">
          <div className="progress-label">Development Progress</div>
          <div className="progress-bar">
            <div className="pulse progress-fill" />
          </div>
        </div>

        <div className="contact-section">
          <p className="contact-label">Stay updated or reach out:</p>
          <div className="contact-links">
            {contactLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <Icon className="svg-m" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}