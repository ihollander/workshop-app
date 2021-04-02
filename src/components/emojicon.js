import React from "react";
import styled from "styled-components";

function Emojicon({ emoji, label, ...rest }) {
  return (
    <Wrapper role="img" aria-labelledby={label} {...rest}>
      {emoji}
    </Wrapper>
  );
}

const Wrapper = styled.span`
  color: transparent;
  text-shadow: 0 0 0 var(--font-color);
`;

export default Emojicon;
