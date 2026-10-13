import '@testing-library/jest-dom/vitest';

// jsdom has no matchMedia; ThemeSwitcher reads prefers-color-scheme on mount.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
// Tells React that tests wrap updates in act(), so it doesn't warn about it.
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
