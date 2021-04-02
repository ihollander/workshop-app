import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import Button from "./button";
import Emojicon from "./emojicon";
import Logo from "./logo";
import { useTheme } from "../theme";

function Header({ projectTitle, exercises }) {
  const { colorMode, toggleTheme } = useTheme();
  const icon = colorMode === "light" ? "☀️" : "🌙";

  const buttons = exercises.filter(Boolean).map(({ readme }) => (
    <Button key={readme.number} as={NavLink} to={`/${readme.number}`}>
      {readme.number}
    </Button>
  ));

  return (
    <Wrapper>
      <Link to="/">
        <TitleWrapper>
          <Logo>{"//"}</Logo>
          <Title>{projectTitle}</Title>
          <Subtitle>Flatiron Workshops</Subtitle>
        </TitleWrapper>
      </Link>
      <nav>
        <ExerciseNavWrapper>{buttons}</ExerciseNavWrapper>
        <Button onClick={toggleTheme}>
          <Emojicon emoji={icon} label={colorMode} />
        </Button>
      </nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: var(--background-secondary-light);
  border-bottom: 2px solid var(--background-primary);
`;

const TitleWrapper = styled.div`
  display: grid;
  grid-template-areas:
    "logo title"
    "logo subtitle";
  font-size: 2.25rem;

  /* this feels hacky! */
  & *:first-child {
    grid-area: logo;
  }
`;

const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 0.6em;
`;

const Subtitle = styled.h3`
  margin: 0;
  padding: 0;
  color: var(--font-color-light);
  font-size: 0.5em;
`;

const ExerciseNavWrapper = styled.div`
  display: none;

  @media (min-width: 600px) {
    display: inline-block;
  }
`;

export default Header;
