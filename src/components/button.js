import React from "react";
import styled from "styled-components";

const STYLES = {
  small: {
    fontSize: "0.75rem",
    padding: "4px 8px",
    fontWeight: 400,
  },
  medium: {
    fontSize: "1rem",
    padding: "4px 8px",
    fontWeight: 400,
  },
  large: {
    fontSize: "2rem",
    padding: "8px 16px",
    fontWeight: 700,
  },
};

function Button({ size = "medium", children, ...rest }) {
  const style = STYLES[size];
  return (
    <Wrapper
      style={{
        "--font-size": style.fontSize,
        "--font-weight": style.fontWeight,
        "--padding": style.padding,
      }}
      {...rest}
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: inline-block;
  margin: 8px;
  padding: var(--padding);
  font-size: 1.25rem;
  font-weight: var(--font-weight);
  color: var(--font-color);
  border: 3px solid var(--color-primary);
  box-shadow: 4px 4px var(--color-secondary);
  border-radius: 3px;
  background: transparent;
  cursor: pointer;
  outline: none;
  transition: 100ms ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px var(--color-secondary);
  }

  &:focus {
    color: white;
    border: 3px solid var(--color-secondary);
    background-color: var(--color-secondary);
  }

  &:active {
    border: 3px solid var(--color-secondary);
    background-color: var(--color-secondary);
  }

  &.active {
    border: 3px solid var(--color-primary);
    background-color: var(--color-primary);
    color: white;
  }
`;

export default Button;
