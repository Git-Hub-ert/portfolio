// ProjectsPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Github, FileText, Calendar, Users, ArrowRight, Youtube } from 'lucide-react';
import projectsData from '../data/Projects.js';

const categories = [
  { name: 'All Projects',    color: '#8b5cf6' },
  { name: 'Web Development', color: '#60a5fa' },
  { name: 'Security Tool',   color: '#f87171' },
  { name: 'Network',         color: '#21644bff' },
  { name: 'Event Management',color: '#fbbf24' },
];

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Projects');

  const filteredProjects = selectedCategory === 'All Projects'
    ? projectsData
    : projectsData.filter(project => project.category === selectedCategory);

  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : '#8b5cf6';
  };

  const getLinkIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'github':  return <Github size={16} />;
      case 'demo':    return <ExternalLink size={16} />;
      case 'youtube': return <Youtube size={16} />;
      default:        return <FileText size={16} />;
    }
  };

  return (
    <div className="projects-container">
      <Helmet>
        <title>Projects | Hubert de Tournay</title>
        <meta
          name="description"
          content="Web development, security tooling, and network engineering projects by Hubert de Tournay, including Battle-X and the OptiAttack adversarial AI dashboard."
        />
        <link rel="canonical" href="https://www.de-tournay.fr/projects" />
      </Helmet>

      <section className="hero-section">
        <h1 className="hero-title">My Projects</h1>
        <p className="introduction">
          A collection of projects showcasing my technical skills, creativity, and problem-solving abilities.
          From full-stack web applications to security tools and event management, each project represents
          hands-on experience and continuous learning.
        </p>
      </section>

      <section className="category-section">
        <h2 className="section-title">Filter by Category</h2>
        <div className="category-grid">
          {categories.map(cat => {
            const projectCount = cat.name === 'All Projects'
              ? projectsData.length
              : projectsData.filter(p => p.category === cat.name).length;
            const isActive = selectedCategory === cat.name;
            return (
              <div
                key={cat.name}
                className={`category-card ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <div className="category-dot" style={{ backgroundColor: cat.color }} />
                <h3 className="category-name">{cat.name}</h3>
                <p className="skill-count">{projectCount} project{projectCount !== 1 ? 's' : ''}</p>
              </div>
            );
          })}
        </div>
        {selectedCategory !== 'All Projects' && (
          <div className="filter-info">
            <p className="filter-text">
              Showing {filteredProjects.length} project(s) in {selectedCategory}
            </p>
            <button onClick={() => setSelectedCategory('All Projects')} className="clear-button">
              Show All Projects
            </button>
          </div>
        )}
      </section>

      <section className="projects-section">
        <h2 className="section-title">
          {selectedCategory === 'All Projects' ? 'All Projects' : selectedCategory}
        </h2>
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => { navigate(`/projects/${project.id}`); window.scrollTo(0, 0); }}
            >
              <div className="project-card-header">
                <div className="category-badge" style={{ backgroundColor: getCategoryColor(project.category) }}>
                  {project.category}
                </div>
                <div
                  className="status-badge"
                  style={{ backgroundColor: project.status === 'Completed' ? '#10b981' : '#f59e0b', color: '#fff' }}
                >
                  {project.status}
                </div>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-tagline">{project.tagline}</p>
              <p className="project-description">{project.description}</p>

              <div className="project-meta">
                <div className="meta-item">
                  <Calendar className="svg-s" />
                  <span>{project.timeframe}</span>
                </div>
                <div className="meta-item">
                  <Users className="svg-s" />
                  <span>{project.teamSize}</span>
                </div>
              </div>

              <div className="tech-section">
                <p className="tech-label">Technologies:</p>
                <div className="tech-tags">
                  {project.technologies.slice(0, 5).map((tech, idx) => (
                    <span
                      key={idx}
                      className="tech-tag"
                      onClick={(e) => { e.stopPropagation(); navigate('/skills'); window.scrollTo(0, 0); }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="tech-tag-more">+{project.technologies.length - 5} more</span>
                  )}
                </div>
              </div>

              {project.links.length > 0 && (
                <div className="project-links">
                  {project.links.slice(0, 2).map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {getLinkIcon(link.type)}
                      <span>{link.type}</span>
                    </a>
                  ))}
                </div>
              )}

              <div className="view-details">
                <span>View Full Details</span>
                <ArrowRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">Interested in collaborating?</h2>
        <p className="cta-description">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
        <button
          className="btn-primary"
          onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
        >
          Get In Touch
        </button>
      </section>
    </div>
  );
}