import React, { useState } from "react";
import styled from "styled-components";
import { ExternalLink } from "@styled-icons/heroicons-outline/ExternalLink";

function Sandbox({ exerciseInfo }) {
  const [selectedTab, setSelectedTab] = useState("exercise");

  const { exercise, solution, readme } = exerciseInfo;

  return (
    <SandboxContainer>
      <nav role="tablist">
        <button
          role="tab"
          onClick={() => setSelectedTab("exercise")}
          aria-selected={selectedTab === "exercise" ? "true" : false}
          aria-controls="exercise"
          id="tab-1"
        >
          Exercise
        </button>
        <button
          role="tab"
          onClick={() => setSelectedTab("solution")}
          aria-selected={selectedTab === "solution" ? "true" : false}
          aria-controls="solution"
          id="tab-2"
        >
          Solution
        </button>
        <button
          role="tab"
          onClick={() => setSelectedTab("tests")}
          aria-selected={selectedTab === "tests" ? "true" : false}
          aria-controls="tests"
          id="tab-3"
        >
          Tests
        </button>
      </nav>
      <div
        id="exercise"
        role="tabpanel"
        aria-labelledby="tab-1"
        hidden={selectedTab !== "exercise"}
      >
        <a href={exercise.isolatedPath} target="_blank" rel="noreferrer">
          <ExternalLink size="20" /> Open in new tab
        </a>
        <iframe
          title={`${readme.title} Exercise`}
          src={exercise.isolatedPath}
        />
      </div>
      <div
        id="solution"
        role="tabpanel"
        aria-labelledby="tab-2"
        hidden={selectedTab !== "solution"}
      >
        <a href={solution.isolatedPath} target="_blank" rel="noreferrer">
          <ExternalLink size="20" /> Open in new tab
        </a>
        <iframe
          title={`${readme.title} Solution`}
          src={solution.isolatedPath}
        />
      </div>
      <div
        id="solution"
        role="tabpanel"
        aria-labelledby="tab-3"
        hidden={selectedTab !== "tests"}
      >
        <span></span>
        <iframe title={`${readme.title} tests`} src={"/test-report"} />
      </div>
    </SandboxContainer>
  );
}

const SandboxContainer = styled.section`
  display: grid;
  grid-template-rows: auto 1fr;

  nav {
    background: var(--background-primary);
  }

  nav button {
    outline: none;
    padding: 1rem;
    background: var(--background-primary);
    border: none;
    border-bottom: 1px solid var(--background-primary);
    color: var(--font-color);
    cursor: pointer;
  }

  nav button[aria-selected="true"] {
    background: var(--background-secondary-light);
    border-bottom: none;
    border-bottom: 1px solid var(--background-secondary-light);
    color: var(--color-primary);
  }

  [role="tabpanel"]:not([hidden]) {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
  }

  [role="tabpanel"] a {
    display: flex;
    padding: 1rem;
    background: var(--background-secondary-light);
    justify-content: flex-end;
  }

  iframe {
    border: none;
    width: 100%;
    height: 100%;
  }
`;

export default Sandbox;
