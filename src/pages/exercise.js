import React, { Suspense, useReducer } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Sandbox from "../components/sandbox";
import FullpageLoader from "../components/fullpage-loader";
import Header from "../components/header";
import FourOhFour from "../pages/four-oh-four";
import Footer from "../components/footer";
import NextPrevButtons from "../components/next-prev-buttons";

function visibilityReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_README_VISIBITY":
      if (state.isReadmeVisible && !state.isSandboxVisible) return state;
      return { ...state, isReadmeVisible: action.payload };
    case "TOGGLE_SANDBOX_VISIBITY":
      if (!state.isReadmeVisible && state.isSandboxVisible) return state;
      return { ...state, isSandboxVisible: action.payload };
    default:
      return state;
  }
}

function ExercisePage({ exercises, projectTitle }) {
  const { exerciseId } = useParams();

  const [{ isReadmeVisible, isSandboxVisible }, dispatch] = useReducer(
    visibilityReducer,
    {
      isReadmeVisible: true,
      isSandboxVisible: true,
    }
  );

  const exerciseInfo = exercises[exerciseId];

  if (!exerciseInfo) return <FourOhFour />;

  const Readme = React.lazy(exerciseInfo.readme.importFn);

  return (
    <Wrapper>
      <Header exercises={exercises} projectTitle={projectTitle} />
      <ExerciseWrapper split={isReadmeVisible && isSandboxVisible}>
        <ReadmeContainer
          isVisible={isReadmeVisible}
          split={isReadmeVisible && isSandboxVisible}
        >
          <Suspense fallback={<FullpageLoader />}>
            <ReadmeStyles>
              <Readme />
            </ReadmeStyles>
          </Suspense>
          <NextPrevButtons exerciseId={exerciseId} exercises={exercises} />
        </ReadmeContainer>
        <Sandbox exerciseInfo={exerciseInfo} isVisible={isSandboxVisible} />
      </ExerciseWrapper>
      <Footer
        isReadmeVisible={isReadmeVisible}
        setIsReadmeVisible={isVisible =>
          dispatch({ type: "TOGGLE_README_VISIBITY", payload: isVisible })
        }
        isSandboxVisible={isSandboxVisible}
        setIsSandboxVisible={isVisible =>
          dispatch({ type: "TOGGLE_SANDBOX_VISIBITY", payload: isVisible })
        }
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
`;

const ExerciseWrapper = styled.main`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: ${p => (p.split ? "50% 50%" : "100%")};
  background: var(--background-primary);
  overflow: auto;

  @media (min-width: 800px) {
    grid-template-columns: ${p =>
      p.split ? "minmax(400px, 50%) 1fr" : "100%"};
    grid-template-rows: 100%;
  }
`;

const ReadmeContainer = styled.div`
  ${p => (p.isVisible ? "" : "display: none;")}
  ${p => (p.split ? "overflow-y: auto;" : "")}
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const ReadmeStyles = styled.section`
  padding: 32px 40px;
  font-size: 1.2rem;

  h1 {
    margin: 0 -16px;
    background: var(--background-secondary);
    border: 3px solid var(--color-primary);
    box-shadow: 1px 1px var(--background-primary),
      4px 4px var(--color-secondary);
    border-radius: 3px;
    padding: 16px;
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

  &:not(pre) code {
    display: inline;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-size: 0.8em;
    padding: 2px 6px;
    margin: 1px;
    border-radius: 3px;
    background-color: var(--background-secondary-light);
  }

  blockquote {
    margin: 0;
    padding: 4px;
    font-size: 0.9em;
    background: var(--background-secondary-light);
    border-left: 3px solid var(--color-primary);
    border-radius: 3px;
  }

  blockquote code {
    background: var(--background-primary);
  }

  pre {
    position: relative;
    margin: 32px -16px;
    background: var(--background-code);
    border: 3px solid var(--color-primary);
    box-shadow: 1px 1px var(--background-primary),
      4px 4px var(--color-secondary);
    border-radius: 3px;
  }

  pre code {
    display: block;
    overflow-y: auto;
    padding: 16px;
  }

  pre code[data-language]::before {
    content: attr(data-language);
    position: absolute;
    top: -30px;
    right: 10px;
    font-size: 14px;
    background: var(--color-primary);
    padding: 0.4px 8px;
    color: white;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  /* Prism Theme */
  code[class*="language-"],
  pre[class*="language-"] {
    color: var(--color-secondary);
    background: none;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
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
    color: #7f848e;
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
    opacity: 0.7;
  }
`;

export default ExercisePage;
