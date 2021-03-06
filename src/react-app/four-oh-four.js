import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function FourOhFour() {
  return (
    <Wrapper>
      <h1>
        <span className="logo">{"//"}</span>404 Page Not Found
      </h1>
      <Link to="/">
        <span role="img" aria-labelledby="arrow-left">
          ←
        </span>
        <span>Go Home</span>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  row-gap: 1rem;
  place-content: center;
  height: 100vh;
  width: 100vw;
  background: var(--background-primary);
  justify-items: center;

  .logo {
    font-weight: var(--font-weight-extra-bold);
    color: var(--color-primary);
    text-shadow: 1px 1px var(--background-secondary),
      3px 3px var(--color-secondary);
    margin-right: 0.5rem;
  }

  h1 {
    margin: 0;
    padding: 0;
    font-size: 4rem;
  }

  a {
    display: inline-block;
    max-width: 40%;
    padding: 0.5rem;
    margin: 0.5rem;
    font-size: 1.25rem;
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

export default FourOhFour;
