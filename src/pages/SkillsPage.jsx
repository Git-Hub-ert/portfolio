// SkillsPage.jsx
import React from 'react';
import NetworkPage from '../components/NetworkPage';
import skillsData from '../data/Skills';

const categories = [
  { name: 'Frontend',             color: '#8b5cf6' },
  { name: 'Backend',              color: '#60a5fa' },
  { name: 'Database',             color: '#a78bfa' },
  { name: 'DevOps',               color: '#34d399' },
  { name: 'Cloud',                color: '#38bdf8' },
  { name: 'Cybersecurity',        color: '#f87171' },
  { name: 'Systems',              color: '#94a3b8' },
  { name: 'Software Engineering', color: '#facc15' },
  { name: 'Tools',                color: '#fbbf24' },
  { name: 'Project Management',   color: '#a3e635' },
  { name: 'Soft Skills',          color: '#fb7185' },
  { name: 'Languages',            color: '#818cf8' },
];

export default function SkillsPage() {
  return (
    <NetworkPage
      // Helmet
      helmetTitle="Skills | Hubert de Tournay"
      helmetDescription="Technical and soft skills of Hubert de Tournay across cybersecurity, cloud, DevOps, frontend and backend development, networking, and project management."
      helmetCanonical="https://www.de-tournay.fr/skills"
      // Layout
      containerClass="skills-container"
      sectionClass="skills-section"
      gridClass="skills-grid"
      // Hero
      heroTitle="My Skills & Expertise"
      introduction="I learn best by building. Each of these skills comes from solving a problem, exploring an idea, or collaborating on something meaningful. My journey spans from cybersecurity fundamentals to full-stack web development, always driven by curiosity and real-world application."
      // Data
      data={skillsData}
      categories={categories}
      // Labels
      categorySectionTitle="Skill Categories"
      networkTitle="Skills Network Map"
      networkDescription="Interactive map of how my skills connect and relate. Click on any skill bubble to highlight its connections."
      getCountLabel={(count) => `${count} skill${count !== 1 ? 's' : ''}`}
      getDisplayedTitle={(selectedItem, selectedCategory) =>
        selectedItem    ? selectedItem.name
        : selectedCategory ? `${selectedCategory} Skills`
        : 'Detailed Skills'
      }
      // Render props
      renderCard={(skill, isActive, onSelect) => (
        <div
          key={skill.id}
          className={`skill-card ${isActive ? 'active' : ''}`}
          onClick={onSelect}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); } }}
        >
          <div className="skill-card-header">
            <div
              className="category-badge"
              style={{ backgroundColor: categories.find(c => c.name === skill.category)?.color || '#60a5fa' }}
            >
              {skill.category}
            </div>
            <span className="learned-date">{skill.learned}</span>
          </div>

          <h3 className="skill-name">{skill.name}</h3>

          {skill.connections.length > 0 && (
            <div className="connections-container">
              <p className="skill-label">Related Skills:</p>
              <div className="connections-tags">
                {skill.connections.map(connId => {
                  const connSkill = skillsData.find(s => s.id === connId);
                  return (
                    <span key={connId} className="connection-tag">
                      {connSkill?.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      renderSelectedLegend={(skill) => (
        <div className="selected-skill-info">
          <strong>Selected: {skill.name}</strong>
          <p>
            Connections:{' '}
            {skill.connections
              .map(id => skillsData.find(s => s.id === id)?.name)
              .filter(Boolean)
              .join(', ') || 'None'}
          </p>
        </div>
      )}
    />
  );
}