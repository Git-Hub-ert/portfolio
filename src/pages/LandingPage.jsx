// LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Briefcase, Award, Dumbbell, Mail, PocketKnife } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navCards = [
    {
      icon: Shield,
      title: 'Experience',
      description: "See where I've worked and what I've accomplished.",
      path: '/experience',
    },
    {
      icon: PocketKnife,
      title: 'Skills',
      description: "Discover the tools and skills I've mastered and applied.",
      path: '/skills',
    },
    {
      icon: Award,
      title: 'Certifications',
      description: "Explore the certifications that validate my expertise.",
      path: '/certifications',
    },
    {
      icon: Briefcase,
      title: 'Projects',
      description: "Check out the projects I've built and contributed to.",
      path: '/projects',
    },
    {
      icon: Dumbbell,
      title: 'Learn More',
      description: "Learn about myself, my studies and my hobbies.",
      path: '/learn-more',
    },
    {
      icon: Mail,
      title: 'Contact',
      description: "Get in touch with me for collaborations or questions.",
      path: '/contact',
    }
  ];

  return (
    <div className="landing-container">
      <Helmet>
        <title>Hubert de Tournay | Cybersecurity Portfolio</title>
        <meta
          name="description"
          content="Hubert de Tournay — cybersecurity engineering student and CISO apprentice at Véolia Connected Solutions. Explore my experience, skills, certifications, and projects."
        />
        <link rel="canonical" href="https://www.de-tournay.fr/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "mainEntity": {
            "@type": "Person",
            "name": "Hubert de Tournay",
            "url": "https://www.de-tournay.fr",
            "image": "https://www.de-tournay.fr/og-image.png",
            "jobTitle": "Cybersecurity Engineering Student & CISO Apprentice",
            "worksFor": {
              "@type": "Organization",
              "name": "Véolia Connected Solutions (Birdz)",
              "url": "https://www.birdz.com"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Lyon",
              "addressCountry": "FR"
            },
            "sameAs": [
              "https://www.linkedin.com/in/hubert-de-tournay/",
              "https://github.com/Git-Hub-ert"
            ],
            "knowsAbout": [
              "Cybersecurity", "Network Security", "Cloud Infrastructure",
              "Penetration Testing", "React", "Python", "CISO"
            ]
          }
        })}</script>
      </Helmet>

      {/* Hero Section */}
      <div className="hero">
        {/* Animated background elements */}
        <div className="bg-container">
          <div
            className="pulse float"
            style={{
              width: '384px',
              height: '384px',
              background: 'var(--color-purple)',
              borderRadius: '50%',
              filter: 'blur(80px)',
              top: '10%',
              left: '10%',
              mixBlendMode: 'multiply',
              position: 'absolute',
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          />
          <div
            className="pulse float"
            style={{
              width: '384px',
              height: '384px',
              background: 'var(--color-blue)',
              borderRadius: '50%',
              filter: 'blur(80px)',
              top: '40%',
              right: '10%',
              mixBlendMode: 'multiply',
              position: 'absolute',
              transform: `translateY(${scrollY * 0.15}px)`
            }}
          />
        </div>

        {/* Content */}
        <div className="hero-content">
          <div className="icon-wrapper">
            <div className="icon-circle">
              <Shield size={64} color="white" />
            </div>
          </div>

          <h1 className="fadeIn hero-title">
            Hubert de Tournay
          </h1>

          <p className="hero-subtitle">
            Cybersecurity Professional & Network Specialist
          </p>

          <p className="hero-description">
            Hi, my name's Hubert, a cybersecurity engineering student / CISO apprentice at{' '}
            <a
              href="https://www.birdz.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-purple-light)', textDecoration: 'underline' }}
            >
              Véolia Connected Solutions
            </a>
            {' '}with a passion for protecting digital assets.<br />
            I aspire to become a CISO and have gained hands-on experience through multiple internships and extracurricular activities.<br />
            Welcome to my portfolio - here, you can explore my projects, experiences, and skills.
          </p>

          <div className="button-group">
            <button
              className="btn-primary"
              onClick={() => { navigate('/experience'); window.scrollTo(0, 0); }}
            >
              View Experience
            </button>
            <button
              className="btn-secondary"
              onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}
            >
              <Mail size={20} />
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Cards Section */}
      <div className="cards-section">
        <div className="cards-container">
          <h2 className="cards-title">
            Explore My Work
          </h2>
          <p className="cards-subtitle">
            Learn about what I do, what I've built, and who I am outside work.
          </p>

          <div className="cards-grid">
            {navCards.map((card, index) => {
              const Icon = card.icon
              return (
                <div
                  key={index}
                  className="card"
                  onClick={() => { navigate(card.path); window.scrollTo(0, 0); }}
                >
                  <div
                    className="card-icon"
                    style={{ background: card.gradient }}
                  >
                    <Icon size={32} />
                  </div>

                  <h3 className="card-title">
                    {card.title}
                  </h3>

                  <p className="card-description">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>© {new Date().getFullYear()} Hubert de Tournay. All rights reserved.</p>
      </footer>
    </div>
  );
}