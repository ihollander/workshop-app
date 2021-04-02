import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ExternalLink } from "@styled-icons/heroicons-outline/ExternalLink";

function Sandbox({ isVisible, exerciseInfo }) {
  const { exerciseId } = useParams();
  const tabKey = `__workshop_app_sanbox_tab_${exerciseId}`;

  const [selectedTab, setSelectedTab] = useState("exercise");

  const { readme, exercise, solution = [] } = exerciseInfo;

  useEffect(() => {
    const tab = localStorage.getItem(tabKey) || "exercise";
    setSelectedTab(tab);
  }, [tabKey]);

  useEffect(() => {
    localStorage.setItem(tabKey, selectedTab);
  }, [tabKey, selectedTab]);

  const title = `${readme.number}. ${readme.title}`;
  useEffect(() => {
    if (document.title !== title) {
      document.title = title;
    }
  }, [title]);

  const sortedSolutions = [...solution].sort(
    (a, b) => a.extraCreditNumber - b.extraCreditNumber
  );

  return (
    <SandboxContainer isVisible={isVisible}>
      <TabList>
        <Tab
          id="tab-1"
          aria-selected={selectedTab === "exercise" && "true"}
          aria-controls="exercise"
          onClick={() => setSelectedTab("exercise")}
        >
          Exercise
        </Tab>
        {sortedSolutions.length > 0 && (
          <Tab
            id="tab-2"
            aria-selected={selectedTab.includes("solution") && "true"}
            aria-controls="solution"
            onClick={() =>
              setSelectedTab(`solution-${sortedSolutions[0].extraCreditNumber}`)
            }
          >
            Solutions
          </Tab>
        )}
      </TabList>
      <TabPanel
        id="exercise"
        aria-labelledby="tab-1"
        hidden={selectedTab !== "exercise"}
      >
        <IsolatedPathLink
          href={exercise.isolatedPath}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size="20" /> Open in new tab
        </IsolatedPathLink>
        <Iframe
          title={`${readme.title} Exercise`}
          src={exercise.isolatedPath}
        />
      </TabPanel>
      <TabPanel
        id="solution"
        aria-labelledby="tab-2"
        hidden={!selectedTab.includes("solution")}
      >
        <TabList>
          {sortedSolutions.map(solution => {
            const id = `solution-${solution.extraCreditNumber}`;
            return (
              <Tab
                key={solution.extraCreditNumber}
                id={`tab-solution-${solution.extraCreditNumber}`}
                aria-selected={selectedTab === id && "true"}
                aria-controls={id}
                onClick={() => setSelectedTab(id)}
              >
                {solution.isExtraCredit
                  ? `Extra Credit ${solution.extraCreditNumber}`
                  : "Exercise Solution"}
              </Tab>
            );
          })}
        </TabList>
        {sortedSolutions.map(solution => (
          <TabPanel
            key={solution.extraCreditNumber}
            id={`solution-${solution.extraCreditNumber}`}
            aria-labelledby={`tab-solution-${solution.extraCreditNumber}`}
            hidden={selectedTab !== `solution-${solution.extraCreditNumber}`}
          >
            <IsolatedPathLink
              href={solution.isolatedPath}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size="20" /> Open in new tab
            </IsolatedPathLink>
            <Iframe
              title={`${readme.title} Solution ${solution.extraCreditNumber}`}
              src={solution.isolatedPath}
            />
          </TabPanel>
        ))}
      </TabPanel>
    </SandboxContainer>
  );
}

const SandboxContainer = styled.section`
  display: ${p => (p.isVisible ? "grid" : "none")};
  grid-template-rows: auto 1fr;
`;

const TabPanel = styled.div.attrs({
  role: "tabpanel",
})`
  &:not([hidden]) {
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
  }
`;

const TabList = styled.nav.attrs({
  role: "tablist",
})`
  background: var(--background-primary);

  ${TabPanel} & {
    background: var(--background-secondary);
  }
`;

const Tab = styled.button.attrs({
  role: "tab",
})`
  outline: none;
  padding: 16px;
  background: var(--background-primary);
  border: none;
  border-bottom: 2px solid var(--background-secondary-light);
  color: var(--font-color);
  cursor: pointer;

  &[aria-selected="true"] {
    background: var(--background-secondary-light);
    border-bottom: 2px solid var(--color-primary);
    color: var(--color-primary);
  }

  /* probably easier to do with props? */
  ${TabPanel} & {
    background: var(--background-secondary);
    border-bottom: 2px solid var(--background-secondary);
  }

  ${TabPanel} &[aria-selected="true"] {
    background: var(--background-secondary-light);
    border-bottom: 2px solid var(--color-primary);
    color: var(--color-primary);
  }
`;

const IsolatedPathLink = styled.a`
  display: flex;
  padding: 16px;
  background: var(--background-secondary-light);
  justify-content: flex-end;
`;

const Iframe = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
  background-color: white;
`;

export default Sandbox;
