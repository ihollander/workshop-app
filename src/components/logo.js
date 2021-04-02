import React from "react";
import styled from "styled-components";

const STYLES = {
  small: {
    fontSize: "0.75em",
  },
  medium: {
    fontSize: "1em",
  },
  large: {
    fontSize: "2em",
  },
};

function Logo({ size = "medium", ...rest }) {
  const style = STYLES[size];
  return (
    <Wrapper
      style={{
        "--font-size": style.fontSize,
      }}
      {...rest}
    >
      {"//"}
    </Wrapper>
  );
}

const Wrapper = styled.span`
  font-weight: var(--font-weight-extra-bold);
  color: var(--color-primary);
  font-size: var(--font-size);
  text-shadow: 1px 1px var(--background-secondary),
    3px 3px var(--color-secondary);
  margin: 0 0.25em;
`;

export default Logo;
