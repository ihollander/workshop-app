import React from "react";
import styled from "styled-components";
import Logo from "./logo";

function FullpageLoader() {
  return (
    <Wrapper>
      <Header>
        <Logo />
        Loading...
      </Header>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
  background: var(--background-primary);
  text-align: center;
`;

const Header = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 4rem;
`;

export default FullpageLoader;
