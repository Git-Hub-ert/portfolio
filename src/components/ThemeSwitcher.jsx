import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'app-theme';

// Storage access throws when the browser blocks site data (e.g. "block all cookies"),
// so the theme must degrade to "not remembered" instead of crashing the app (NV-05).
const readSavedTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const saveTheme = (themeName) => {
  try {
    localStorage.setItem(STORAGE_KEY, themeName);
  } catch {
    // Not persisted; the choice still applies for this page view.
  }
};

const applyTheme = (themeName) => {
  document.documentElement.setAttribute('data-theme', themeName);
};

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('purple');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = readSavedTheme();
    if (savedTheme === 'purple' || savedTheme === 'teal') {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'purple' : 'teal';
      setTheme(systemTheme);
      // Not saved: only an explicit toggle is remembered, so the OS preference keeps
      // applying on later visits (first half of NV-06).
      applyTheme(systemTheme);
    }
  }, []);

  const handleToggle = () => {
    const newTheme = theme === 'purple' ? 'teal' : 'purple';
    setTheme(newTheme);
    applyTheme(newTheme);
    saveTheme(newTheme);

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
