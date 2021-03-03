import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  
  :root {
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-bold: 700;
    --font-weight-extra-bold: 900;
  }

  html {
    font-family: "Lato", "Trebuchet MS", sans-serif;
    font-size: 16px;
    color: var(--font-color);
    transition: color 0.4s,background 0.4s,background-color 0.4s,border-color 0.4s;
  }

  body: {
    margin: 0;
  }

  &::-webkit-scrollbar {
    background: var(--background-secondary);
    width: 10px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #dddd;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1em;
    font-weight: var(--font-weight-extra-bold);
  }

  em {
    font-weight: var(--font-weight-bold);
    color: var(--color-secondary);
  }

  strong {
    font-weight: var(--font-weight-bold);
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
  }

  p {
    line-height: 1.5;
  }

  li {
    line-height: 1.5;
  }

  *::selection {
    background: var(--color-primary);
    color: white;
  }

  blockquote {
    margin: 0;
    padding: 0.2rem 2rem;
    font-size: 0.9em;
    background: var(--background-secondary);
    border-left: 3px solid var(--color-primary);
    border-radius: 3px;
  }

`;

export default GlobalStyle;
