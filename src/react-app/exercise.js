import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Sandbox from "./sandbox";
import { prismTheme } from "./theme";

function Exercise({ exercises }) {
  const { exerciseId } = useParams();
  const exerciseInfo = exercises[exerciseId];

  if (!exerciseInfo) return <h1>404 Not Found</h1>;

  const { readme } = exerciseInfo;

  const readmeComp = React.createElement(React.lazy(readme.importFn));

  return (
    <ExerciseContainer>
      <ReadmeContainer>
        <Suspense fallback={<div>Loading...</div>}>{readmeComp}</Suspense>
      </ReadmeContainer>
      <Sandbox exerciseInfo={exerciseInfo} />
    </ExerciseContainer>
  );
}

const ExerciseContainer = styled.main`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 50% 50%;

  @media (min-width: 600px) {
    grid-template-columns: minmax(400px, 50%) 1fr;
    grid-template-rows: 100%;
  }
`;

const ReadmeContainer = styled.section`
  padding: 2rem 2.5rem;
  overflow-y: scroll;
  font-size: 18px;
  background: var(--background-primary);

  ${prismTheme}

  h1 {
    margin: 0 -1rem;
    background: var(--background-secondary);
    border: 3px solid var(--color-primary);
    box-shadow: 1px 1px var(--background-primary),
      4px 4px var(--color-secondary);
    border-radius: 3px;
    padding: 1rem;
    text-align: center;
  }

  a {
    font-weight: var(--font-weight-bold);
    transition: box-shadow 400ms ease 0s;
    box-shadow: 0px 0px 0px var(--color-primary);
  }

  a:hover {
    box-shadow: 0px 0px 0px var(--color-primary);
    transition: box-shadow 100ms ease 0s;
    box-shadow: 0px 2px 0px var(--color-primary);
  }

  > :not(pre) code {
    display: inline;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-size: 0.8em;
    padding: 2px 6px;
    margin: 1px;
    border-radius: 3px;
    background-color: var(--background-secondary-light);
  }

  pre {
    position: relative;
    margin: 1.5rem -1rem;
    background: var(--background-code);
    border: 3px solid var(--color-primary);
    box-shadow: 1px 1px var(--background-primary),
      4px 4px var(--color-secondary);
    border-radius: 3px;
  }

  pre code {
    display: block;
    overflow-y: auto;
    padding: 1rem;
  }

  pre code[data-language]::before {
    content: attr(data-language);
    position: absolute;
    top: -30px;
    right: 10px;
    font-size: 14px;
    background: var(--color-primary);
    padding: 0.25rem 0.5rem;
    color: white;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
`;

export default Exercise;
