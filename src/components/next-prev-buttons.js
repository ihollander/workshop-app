import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./button";
import Emojicon from "./emojicon";

function NextPrevButtons({ exercises, exerciseId }) {
  const next = exercises[Number(exerciseId) + 1];
  const prev = exercises[Number(exerciseId) - 1];

  return (
    <Wrapper>
      {prev ? (
        <Button as={Link} to={`/${prev.readme.number}`}>
          <Emojicon label="arrow-left" emoji="←" />
          <span>Previous</span>
        </Button>
      ) : (
        <div />
      )}
      {next ? (
        <Button as={Link} to={`/${next.readme.number}`}>
          <span>Next</span>
          <Emojicon label="arrow-right" emoji="→" />
        </Button>
      ) : (
        <div />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 40px;
`;

export default NextPrevButtons;
