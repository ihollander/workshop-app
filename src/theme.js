import React, { useContext, useEffect } from "react";

const ThemeContext = React.createContext();

function getInitialColor() {
  const savedPreference = window.localStorage.getItem(
    "__workshop_app_color_mode"
  );
  if (savedPreference) return savedPreference;

  const query = window.matchMedia("(prefers-color-scheme: dark)");
  const theme = query && query.matches ? "dark" : "light";

  setVariables(theme);

  return theme;
}

const COLORS = {
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

const CSS_PROPERTIES = [
  "--font-color",
  "--font-color-light",
  "--background-primary",
  "--background-secondary",
  "--background-secondary-light",
  "--background-code",
  "--color-primary",
  "--color-secondary",
  "--purple",
  "--pink",
];

function setVariables(theme) {
  const root = window.document.documentElement;

  for (const key of CSS_PROPERTIES) {
    root.style.setProperty(key, COLORS[theme][key]);
  }
}

export function ThemeProvider({ children }) {
  const [colorMode, setColorMode] = React.useState(getInitialColor);

  useEffect(() => {
    setVariables(colorMode);
    window.localStorage.setItem("__workshop_app_color_mode", colorMode);
  }, [colorMode]);

  function toggleTheme() {
    setColorMode(colorMode => (colorMode === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ colorMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
