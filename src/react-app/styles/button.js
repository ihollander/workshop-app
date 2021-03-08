import styled from "styled-components";

export default styled.button`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  margin: 0.5rem;
  font-size: 1.25rem;
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

  span[role="img"] {
    color: transparent;
    text-shadow: 0 0 0 var(--font-color);
    transform: scale(0.8);
  }
`;
