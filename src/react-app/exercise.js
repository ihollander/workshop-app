import React, { useState, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Sandbox from "./sandbox";
import FullpageLoader from "./fullpage-loader";
import FourOhFour from "./four-oh-four";
import { prismTheme } from "./theme";

function Exercise({ exercises }) {
  const { exerciseId } = useParams();
  const exerciseInfo = exercises[exerciseId];
  const [isReadmeVisible, setIsReadmeVisible] = useState(true);
  const [isSandboxVisible, setIsSandboxVisible] = useState(true);

  const next = exercises[Number(exerciseId) + 1];
  const prev = exercises[Number(exerciseId) - 1];

  if (!exerciseInfo) return <FourOhFour />;

  const Readme = React.lazy(exerciseInfo.readme.importFn);

  return (
    <>
      <ExerciseContainer split={isReadmeVisible && isSandboxVisible}>
        <ReadmeContainer isVisible={isReadmeVisible}>
          <ReadmeStyles>
            <Suspense fallback={<FullpageLoader />}>
              <Readme />
              <ReadmeButtons>
                {prev ? (
                  <Link to={`/${prev.readme.number}`}>
                    <span role="img" aria-labelledby="arrow-left">
                      ←
                    </span>
                    <span>Previous</span>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link to={`/${next.readme.number}`}>
                    <span>Next</span>
                    <span role="img" aria-labelledby="arrow-right">
                      →
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </ReadmeButtons>
            </Suspense>
          </ReadmeStyles>
        </ReadmeContainer>
        <Sandbox exerciseInfo={exerciseInfo} isVisible={isSandboxVisible} />
      </ExerciseContainer>
      <WindowManager>
        <label>
          Show Readme{" "}
          <input
            type="checkbox"
            checked={isReadmeVisible}
            onChange={e => setIsReadmeVisible(e.target.checked)}
          />
        </label>
        <label>
          Show Exercise{" "}
          <input
            type="checkbox"
            checked={isSandboxVisible}
            onChange={e => setIsSandboxVisible(e.target.checked)}
          />
        </label>
      </WindowManager>
    </>
  );
}

const WindowManager = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: auto;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem;
  background: var(--background-secondary-light);
`;

const ExerciseContainer = styled.main`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: ${({ split }) => (split ? "50% 50%" : "100%")};
  background: var(--background-primary);

  @media (min-width: 800px) {
    grid-template-columns: ${({ split }) =>
      split ? "minmax(400px, 50%) 1fr" : "100%"};
    grid-template-rows: 100%;
  }
`;

const ReadmeContainer = styled.div`
  ${({ isVisible }) => (isVisible ? "" : "display: none;")}
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  overflow-y: auto;
`;

const ReadmeStyles = styled.section`
  padding: 2rem 2.5rem;
  font-size: 1.2rem;

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

  img {
    max-width: 100%;
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

  > blockquote code {
    background: var(--background-primary);
  }

  pre {
    position: relative;
    margin: 2rem -1rem;
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

const ReadmeButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;

  a {
    display: inline-block;
    max-width: 40%;
    padding: 0.5rem;
    margin: 0.5rem;
    color: var(--font-color);
    border: 3px solid var(--color-primary);
    box-shadow: 4px 4px var(--color-secondary);
    border-radius: 3px;
    background: var(--background-secondary);
    cursor: pointer;
    outline: none;
    transition: 100ms ease;
  }

  a:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px var(--color-secondary);
  }

  a:focus {
    border: 3px solid var(--color-secondary);
    background-color: var(--color-secondary);
  }

  a span[role="img"] {
    margin: 0 0.5rem;
    font-size: 1.25rem;
  }
`;

export default Exercise;
