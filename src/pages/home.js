import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../components/logo";

function Home({ exercises, projectTitle }) {
  const numbers = exercises
    .filter(Boolean)
    .map(ex => ({ title: ex.readme.title, number: ex.readme.number }));

  return (
    <PageWrapper>
      <TitleWrapper>
        <Title>{projectTitle}</Title>
        <SubTitle>
          <Logo />
          Flatiron Workshops
        </SubTitle>
        <ExerciseList>
          {numbers.map(({ number, title }) => (
            <ExerciseListItem key={number}>
              <ExerciseLink to={`/${number}`}>
                {number}. {title}
              </ExerciseLink>
            </ExerciseListItem>
          ))}
        </ExerciseList>
      </TitleWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
  background: var(--background-primary);
`;

const TitleWrapper = styled.main`
  padding: 24px;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 64px;
  text-align: center;
`;

const SubTitle = styled.h2`
  color: var(--font-color-light);
  font-size: 44px;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const ExerciseList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 24px 0;
`;

const ExerciseListItem = styled.li`
  margin: 16px 0;
`;

const ExerciseLink = styled(Link)`
  display: block;
  padding: 16px;
  background: var(--background-secondary);
  transition: background 400ms ease;
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);

  &:hover {
    background: var(--background-secondary-light);
    transition: background 100ms ease;
  }
`;

export default Home;
