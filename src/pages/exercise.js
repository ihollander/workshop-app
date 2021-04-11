import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Sandbox from "../components/sandbox";
import FullpageLoader from "../components/fullpage-loader";
import Header from "../components/header";
import FourOhFour from "../pages/four-oh-four";
import Footer from "../components/footer";
import NextPrevButtons from "../components/next-prev-buttons";
import MDXStyles from "../components/mdx-styles";
import useExerciseVisibility from "../hooks/useExerciseVisibility";

function ExercisePage({ exercises, projectTitle }) {
  const { exerciseId } = useParams();

  const {
    isReadmeVisible,
    isSandboxVisible,
    toggleReadmeVisibility,
    toggleSandboxVisibility,
  } = useExerciseVisibility();

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
            <MDXStyles>
              <Readme />
            </MDXStyles>
          </Suspense>
          <NextPrevButtons exerciseId={exerciseId} exercises={exercises} />
        </ReadmeContainer>
        <Sandbox exerciseInfo={exerciseInfo} isVisible={isSandboxVisible} />
      </ExerciseWrapper>
      <Footer
        isReadmeVisible={isReadmeVisible}
        setIsReadmeVisible={isVisible => toggleReadmeVisibility(isVisible)}
        isSandboxVisible={isSandboxVisible}
        setIsSandboxVisible={isVisible => toggleSandboxVisibility(isVisible)}
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

export default ExercisePage;
