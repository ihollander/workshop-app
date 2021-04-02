import React from "react";
import styled from "styled-components";

function Footer({
  isReadmeVisible,
  setIsReadmeVisible,
  isSandboxVisible,
  setIsSandboxVisible,
}) {
  return (
    <Wrapper>
      <label>
        Show Readme{" "}
        <input
          type="checkbox"
          checked={isReadmeVisible}
          onChange={e => setIsReadmeVisible(e.target.checked)}
          disabled={!isSandboxVisible}
        />
      </label>
      <label>
        Show Exercise{" "}
        <input
          type="checkbox"
          checked={isSandboxVisible}
          onChange={e => setIsSandboxVisible(e.target.checked)}
          disabled={!isReadmeVisible}
        />
      </label>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 16px;
  background: var(--background-secondary-light);
`;

export default Footer;
