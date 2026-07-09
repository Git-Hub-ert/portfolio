import React, { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('purple');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage first
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Fall back to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'purple' : 'teal';
      setTheme(systemTheme);
      applyTheme(systemTheme);
    }
  }, []);

  const applyTheme = (themeName) => {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('app-theme', themeName);
  };

  const handleToggle = () => {
    const newTheme = theme === 'purple' ? 'teal' : 'purple';
    setTheme(newTheme);
    applyTheme(newTheme);

    // Announce to screen readers
    const announcement = `Theme set to ${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)}`;
    announceToScreenReader(announcement);
  };

  const announceToScreenReader = (message) => {
    const liveRegion = document.getElementById('theme-announcer');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  };

  return (
    <>
      {/* Invisible live region for screen reader announcements */}
      <div
        id="theme-announcer"
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* Theme Toggle Button */}
      {mounted && (
        <button
          className="theme-switcher"
          onClick={handleToggle}
          aria-label="Toggle site theme"
          aria-pressed={theme === 'teal'}
          title={`Current theme: ${theme}`}
        >
          <div className="theme-switcher-pill">
            {/* Purple side */}
            <div className="theme-switcher-side theme-switcher-side--purple" />
            
            {/* Teal side */}
            <div className="theme-switcher-side theme-switcher-side--teal" />
            
            {/* Animated knob */}
            <div
              className={`theme-switcher-knob theme-switcher-knob--${theme}`}
              aria-hidden="true"
            />
          </div>
        </button>
      )}
    </>
  );
};

export default ThemeSwitcher;
