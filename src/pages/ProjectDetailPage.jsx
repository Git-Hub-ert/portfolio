// ProjectDetailPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, FileText, Youtube, Calendar, Users, CheckCircle, Briefcase } from 'lucide-react';
import projectsData from '../data/Projects.js';

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="projects-container">
        <Helmet>
          <title>Project Not Found | Hubert de Tournay</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="error-container">
          <h1 className="hero-title">Project Not Found</h1>
          <p className="introduction">The project you're looking for doesn't exist.</p>
          <button
            className="btn-primary"
            onClick={() => { navigate('/projects'); window.scrollTo(0, 0); }}
          >
            <ArrowLeft size={20} />
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (categoryName) => {
    const colors = {
      'Web Development':  '#60a5fa',
      'Security Tool':    '#f87171',
      'Network':          '#21644b',
      'Event Management': '#fbbf24',
    };
    return colors[categoryName] || '#8b5cf6';
  };

  const getLinkIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'github':  return <Github size={20} />;
      case 'demo':    return <ExternalLink size={20} />;
      case 'youtube': return <Youtube size={20} />;
      default:        return <FileText size={20} />;
    }
  };

  return (
    <div className="projects-container">
      <Helmet>
        <title>{project.title} | Hubert de Tournay</title>
        <meta name="description" content={project.tagline} />
        <link rel="canonical" href={`https://www.de-tournay.fr/projects/${project.id}`} />
      </Helmet>

      <div className="back-button-container">
        <button
          className="back-button"
          onClick={() => { navigate('/projects'); window.scrollTo(0, 0); }}
        >
          <ArrowLeft size={20} />
          <span>Back to Projects</span>
        </button>
      </div>

      <section className="project-detail-hero">
        <div className="category-badge" style={{ backgroundColor: getCategoryColor(project.category) }}>
          {project.category}
        </div>
        <h1 className="hero-title">{project.title}</h1>
        <p className="project-tagline-large">{project.tagline}</p>

        <div className="project-meta-large">
          <div className="meta-item-large">
            <Calendar className="svg-m" />
            <div>
              <p className="meta-label">Timeline</p>
              <p className="meta-value">{project.timeframe}</p>
            </div>
          </div>
          <div className="meta-item-large">
            <Users className="svg-m" />
            <div>
              <p className="meta-label">Team Size</p>
              <p className="meta-value">{project.teamSize}</p>
            </div>
          </div>
          <div className="meta-item-large">
            <Briefcase className="svg-m" />
            <div>
              <p className="meta-label">Role</p>
              <p className="meta-value">{project.role}</p>
            </div>
          </div>
        </div>

        {project.links.length > 0 && (
          <div className="project-links-large">
            {project.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn-large"
              >
                {getLinkIcon(link.type)}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        )}
      </section>

      <div className="project-detail-content">
        <section className="detail-section">
          <h2 className="detail-section-title">Overview</h2>
          <div className="detail-card">
            <p className="detail-text">{project.detailedDescription}</p>
          </div>
        </section>

        <section className="detail-section">
          <h2 className="detail-section-title">My Contributions</h2>
          <div className="detail-card">
            <ul className="contributions-list">
              {project.contributions.map((contribution, idx) => (
                <li key={idx} className="contribution-item">
                  <CheckCircle size={20} color="#10b981" />
                  <span>{contribution}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="detail-section">
          <h2 className="detail-section-title">Technologies & Skills</h2>
          <div className="detail-card">
            <div className="tech-grid">
              {project.technologies.map((tech, idx) => (
                <div
                  key={idx}
                  className="tech-item"
                  onClick={() => { navigate('/skills'); window.scrollTo(0, 0); }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="detail-section">
          <h2 className="detail-section-title">Key Highlights</h2>
          <div className="detail-card">
            <div className="highlights-grid">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="highlight-item">
                  <div className="highlight-icon">✨</div>
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="detail-section">
          <h2 className="detail-section-title">Explore More Projects</h2>
          <div className="related-projects">
            {projectsData
              .filter(p => p.id !== project.id)
              .slice(0, 3)
              .map(relatedProject => (
                <div
                  key={relatedProject.id}
                  className="related-project-card"
                  onClick={() => { navigate(`/projects/${relatedProject.id}`); window.scrollTo(0, 0); }}
                >
                  <h3 className="related-project-title">{relatedProject.title}</h3>
                  <p className="related-project-description">{relatedProject.tagline}</p>
                  <div className="related-project-arrow">
                    <ArrowLeft size={20} style={{ transform: 'rotate(180deg)' }} />
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}