import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Must match the key public/head-boot.js reads before the first paint.
 * If these two ever disagree, every load flashes the wrong theme.
 */
const STORAGE_KEY = 'dc-regina-theme';

/*
  localStorage is not always there to be read.

  Safari in private browsing, a browser set to block site data, and an iframe
  with third-party storage partitioned off all *throw* on access rather than
  returning null. This provider sits above <App /> and therefore above the
  ErrorBoundary, so a throw in the state initialiser below is not caught by
  anything — it takes out the whole render and leaves a white page. A theme
  preference is not worth that.
*/
const readStoredTheme = (): Theme | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
};

const storeTheme = (theme: Theme) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Nothing to do: the theme still applies for this visit.
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme() ?? 'dark');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light', theme === 'light');
    root.classList.toggle('dark', theme !== 'light');
    storeTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
