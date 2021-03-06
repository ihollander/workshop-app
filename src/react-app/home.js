import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Home({ exercises, projectTitle }) {
  const numbers = exercises
    .filter(Boolean)
    .map(ex => ({ title: ex.readme.title, number: ex.readme.number }));

  return (
    <PageWrapper>
      <main>
        <TitleWrapper>
          <h1>{projectTitle}</h1>
          <h2>
            <span className="logo">{"//"}</span>Flatiron Workshops
          </h2>
        </TitleWrapper>
        <ExerciseList>
          {numbers.map(({ number, title }) => (
            <li key={number}>
              <Link to={`/${number}`}>
                {number}. {title}
              </Link>
            </li>
          ))}
        </ExerciseList>
      </main>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: grid;
  place-content: center;
  height: 100vh;
  width: 100vw;
  background: var(--background-primary);
`;

const TitleWrapper = styled.div`
  text-align: center;
  .logo {
    font-weight: var(--font-weight-extra-bold);
    color: var(--color-primary);
    text-shadow: 1px 1px var(--background-secondary),
      3px 3px var(--color-secondary);
    margin-right: 0.5rem;
  }

  h1 {
    margin: 0;
    padding: 0;
    font-size: 4rem;
  }

  h2 {
    color: var(--font-color-light);
    font-size: 2.7rem;
    margin: 0;
    padding: 0;
  }
`;

const ExerciseList = styled.ul`
  list-style: none;
  margin: 1.5rem 0;
  padding: 0;

  li {
    margin: 1rem 0;
  }

  li a {
    display: block;
    padding: 1rem;
    background: var(--background-secondary);
    transition: background 400ms ease;
    font-size: 1.25rem;
    font-weight: var(--font-weight-bold);
  }

  li a:hover {
    background: var(--background-secondary-light);
    transition: background 100ms ease;
  }
`;

export default Home;
