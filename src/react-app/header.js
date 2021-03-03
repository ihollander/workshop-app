import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "./theme";

function Header({ projectTitle, exercises, setIsShowingMenu }) {
  const { colorMode, setColorMode } = useTheme();
  const icon = colorMode === "light" ? "☀️" : "🌙";

  const numbers = exercises.filter(Boolean).map((ex) => ex.readme.number);

  return (
    <Wrapper>
      <Link to="/">
        <TitleWrapper>
          <div className="logo">{"//"}</div>
          <h1>{projectTitle}</h1>
          <h2>Flatiron Workshops</h2>
        </TitleWrapper>
      </Link>
      <NavWrapper>
        <ExerciseNavWrapper>
          {numbers.map((num) => (
            <NavLink key={num} to={`/${num}`}>
              {num}
            </NavLink>
          ))}
        </ExerciseNavWrapper>
        <button
          onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
        >
          <span role="img" aria-label={colorMode}>
            {icon}
          </span>
        </button>
      </NavWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background: var(--background-secondary-light);
  border-bottom: 2px solid var(--background-primary);

  a {
    color: var(--font-color);
    cursor: pointer;
  }

  a:hover {
    box-shadow: none;
  }
`;

const TitleWrapper = styled.div`
  display: grid;
  grid-template-areas:
    "logo title"
    "logo subtitle";
  column-gap: 0.5rem;

  .logo {
    grid-area: logo;
    font-weight: var(--font-weight-extra-bold);
    color: var(--color-primary);
    font-size: 2.25rem;
    text-shadow: 1px 1px var(--background-secondary),
      3px 3px var(--color-secondary);
  }

  h1 {
    grid-area: title;
    margin: 0;
    padding: 0;
    font-size: 1.25rem;
  }

  h2 {
    grid-area: subtitle;
    color: var(--font-color-light);
    font-size: 1rem;
    margin: 0;
    padding: 0;
  }
`;

const NavWrapper = styled.nav`
  button,
  a {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    margin: 0.5rem;
    font-size: 1.25rem;
    color: var(--font-color);
    border: 3px solid var(--color-primary);
    box-shadow: 4px 4px var(--color-secondary);
    border-radius: 3px;
    background: transparent;
    cursor: pointer;
    outline: none;
    transition: 100ms ease;
  }

  button:hover,
  a:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px var(--color-secondary);
  }

  button:focus,
  a:focus {
    border: 3px solid var(--color-secondary);
    background-color: var(--color-secondary);
  }

  button:active,
  a:active {
    border: 3px solid var(--color-secondary);
    background-color: var(--color-secondary);
  }

  a.active {
    border: 3px solid var(--color-primary);
    background-color: var(--color-primary);
    color: white;
  }

  span[role="img"] {
    color: transparent;
    text-shadow: 0 0 0 var(--font-color);
    transform: scale(0.8);
  }
`;

const ExerciseNavWrapper = styled.div`
  display: none;

  @media (min-width: 600px) {
    display: inline-block;
  }
`;

export default Header;
