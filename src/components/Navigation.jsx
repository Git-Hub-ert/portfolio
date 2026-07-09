// Navigation.jsx
import React, { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navigation() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home',           path: '/' },
    { name: 'Experience',     path: '/experience' },
    { name: 'Skills',         path: '/skills' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Projects',       path: '/projects' },
    { name: 'Learn More',     path: '/learn-more' },
    { name: 'Contact',        path: '/contact' },
  ];

  return (
    <nav style={{
      background: isScrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : 'none',
    }}>
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="brand">
          <div className="logo-circle">
            <Shield size={24} color="white" />
          </div>
          <Link
            to="/"
            className="brand-text"
            onClick={() => window.scrollTo(0, 0)}
          >
            Hubert de Tournay
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="nav-link"
              onClick={() => window.scrollTo(0, 0)}
            >
              {link.name}
            </Link>
          ))}
          <ThemeSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu open">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="mobile-nav-link"
              onClick={() => {
                window.scrollTo(0, 0);
                setIsMobileMenuOpen(false);
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}