import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/logo";
import Button from "../components/button";
import Emojicon from "../components/emojicon";

function FourOhFour() {
  return (
    <Wrapper>
      <Header>
        <Logo />
        404 Page Not Found
      </Header>
      <Button size="large" as={Link} to="/">
        <Emojicon emoji="←" label="arrow-left" />
        Go Home
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  row-gap: 16px;
  place-content: center;
  height: 100%;
  background: var(--background-primary);
  justify-items: center;
`;

const Header = styled.h1`
  font-size: 4rem;
  margin: 16px;
`;

export default FourOhFour;
