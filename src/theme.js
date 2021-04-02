import React, { useContext, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

const ThemeContext = React.createContext();

const THEMES = {
  light: {
    "--font-color": "black",
    "--font-color-light": "#5e5e5e",
    "--background-primary": "#daf5fe",
    "--background-secondary": "white",
    "--background-secondary-light": "#f5fbfd",
    "--background-code": "white",
    "--color-primary": "blue",
    "--color-secondary": "red",
    "--pink": "#8501c6",
    "--purple": "#8501c6",
  },
  dark: {
    "--font-color": "white",
    "--font-color-light": "#b4b4b4",
    "--background-primary": "#030416",
    "--background-secondary": "#151f28",
    "--background-secondary-light": "#2b3c4b",
    "--background-code": "#151f28",
    "--color-primary": "#338fff",
    "--color-secondary": "#00efe1",
    "--pink": "#ff34f7",
    "--purple": "#e1a3ff",
  },
};

function getInitialTheme() {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  return query && query.matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage(
    "__workshop_app_theme",
    getInitialTheme()
  );

  useEffect(() => {
    if (theme in THEMES) {
      const root = window.document.documentElement;
      const themeProperties = THEMES[theme];
      for (const [key, value] of Object.entries(themeProperties)) {
        root.style.setProperty(key, value);
      }
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(theme => (theme === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
