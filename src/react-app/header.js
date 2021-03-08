import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import Button from "./styles/button";
import { useTheme } from "./theme";

function Header({ projectTitle, exercises }) {
  const { colorMode, setColorMode } = useTheme();
  const icon = colorMode === "light" ? "☀️" : "🌙";

  const numbers = exercises.filter(Boolean).map(ex => ex.readme.number);

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
          {numbers.map(num => (
            <Button key={num} as={NavLink} to={`/${num}`}>
              {num}
            </Button>
          ))}
        </ExerciseNavWrapper>
        <Button
          onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
        >
          <span role="img" aria-label={colorMode}>
            {icon}
          </span>
        </Button>
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

const NavWrapper = styled.nav``;

const ExerciseNavWrapper = styled.div`
  display: none;

  @media (min-width: 600px) {
    display: inline-block;
  }
`;

export default Header;
