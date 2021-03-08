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

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export const prismTheme = `
code[class*="language-"],
pre[class*="language-"] {
	color: var(--color-secondary);
	background: none;
	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
	font-size: 0.8em;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;

	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}

/* Code blocks */
pre[class*="language-"] {
	position: relative;
	overflow: visible;
	padding: 0;
}

.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: #7F848E;
	font-style: italic;
}

.token.punctuation {
	color: var(--font-color-light);
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.function-name,
.token.constant,
.token.symbol,
.token.deleted {
	color: var(--font-color);
}

.token.function,
.token.builtin,
.token.inserted {
	color: var(--color-primary);
}

.token.selector,
.token.attr-name,
.token.string,
.token.char {
  color: var(--purple);
}

.token.operator,
.token.entity,
.token.url,
.token.variable {
	color: grey;
}

.token.atrule,
.token.attr-value,
.token.keyword,
.token.class-name {
	color: var(--pink);
}

.token.regex,
.token.important {
	color: #e90;
}

.language-css .token.string,
.style .token.string {
	color: #a67f59;
}

.token.important {
	font-weight: normal;
}

.token.bold {
	font-weight: bold;
}
.token.italic {
	font-style: italic;
}

.token.entity {
	cursor: help;
}

.token.namespace {
	opacity: .7;
}
`;
