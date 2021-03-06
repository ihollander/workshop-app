import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ExternalLink } from "@styled-icons/heroicons-outline/ExternalLink";
import { useParams } from "react-router-dom";

function Sandbox({ exerciseInfo }) {
  const { exerciseId } = useParams();
  const tabKey = `__workshop_app_sanbox_tab_${exerciseId}`;

  const [selectedTab, setSelectedTab] = useState("exercise");

  useEffect(() => {
    const tab = localStorage.getItem(tabKey) || "exercise";
    setSelectedTab(tab);
  }, [tabKey]);

  useEffect(() => {
    localStorage.setItem(tabKey, selectedTab);
  }, [tabKey, selectedTab]);

  const { exercise, solution, readme } = exerciseInfo;

  const sortedSolutions = [...solution].sort(
    (a, b) => a.extraCreditNumber - b.extraCreditNumber
  );

  return (
    <SandboxContainer>
      <nav role="tablist">
        <button
          role="tab"
          onClick={() => setSelectedTab("exercise")}
          aria-selected={selectedTab === "exercise" && "true"}
          aria-controls="exercise"
          id="tab-1"
        >
          Exercise
        </button>
        <button
          role="tab"
          onClick={() =>
            setSelectedTab(`solution-${sortedSolutions[0].extraCreditNumber}`)
          }
          aria-selected={selectedTab.includes("solution") && "true"}
          aria-controls="solution"
          id="tab-2"
        >
          Solutions
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
        hidden={!selectedTab.includes("solution")}
      >
        <nav role="tablist">
          {sortedSolutions.map(solution => {
            const id = `solution-${solution.extraCreditNumber}`;
            return (
              <button
                key={solution.extraCreditNumber}
                role="tab"
                onClick={() => setSelectedTab(id)}
                aria-selected={selectedTab === id && "true"}
                aria-controls={id}
                id={`tab-solution-${solution.extraCreditNumber}`}
              >
                {solution.isExtraCredit
                  ? `Extra Credit ${solution.extraCreditNumber}`
                  : "Exercise Solution"}
              </button>
            );
          })}
        </nav>
        {sortedSolutions.map(solution => (
          <div
            key={solution.extraCreditNumber}
            id={`solution-${solution.extraCreditNumber}`}
            role="tabpanel"
            aria-labelledby={`tab-solution-${solution.extraCreditNumber}`}
            hidden={selectedTab !== `solution-${solution.extraCreditNumber}`}
          >
            <a href={solution.isolatedPath} target="_blank" rel="noreferrer">
              <ExternalLink size="20" /> Open in new tab
            </a>
            <iframe
              title={`${readme.title} Solution ${solution.extraCreditNumber}`}
              src={solution.isolatedPath}
            />
          </div>
        ))}
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
    border-bottom: 2px solid var(--background-secondary-light);
    color: var(--font-color);
    cursor: pointer;
  }

  nav button[aria-selected="true"] {
    background: var(--background-secondary-light);
    border-bottom: 2px solid var(--color-primary);
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

  [role="tabpanel"] nav {
    background: var(--background-secondary);
  }

  [role="tabpanel"] nav button {
    background: var(--background-secondary);
  }

  [role="tabpanel"] nav button {
    border-bottom: 2px solid var(--background-secondary);
  }

  [role="tabpanel"] nav button[aria-selected="true"] {
    background: var(--background-secondary-light);
    border-bottom: 2px solid var(--color-primary);
    color: var(--color-primary);
  }

  iframe {
    border: none;
    width: 100%;
    height: 100%;
  }
`;

export default Sandbox;
