import React from "react";
import styled from "styled-components";

function FullpageLoader() {
  return (
    <Wrapper>
      <h1>
        <span className="logo">{"//"}</span>Loading...
      </h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
  background: var(--background-primary);
  text-align: center;

  .logo {
    font-weight: var(--font-weight-extra-bold);
    color: var(--color-primary);
    text-shadow: 1px 1px var(--background-secondary),
      3px 3px var(--color-secondary);
    margin-right: 8px;
  }

  h1 {
    margin: 0;
    padding: 0;
    font-size: 4rem;
  }
`;

export default FullpageLoader;
