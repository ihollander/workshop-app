import React from "react";
import { MDXProvider } from "@mdx-js/react";
import styled from "styled-components";
import CodeBlock from "./code-block";

const H1 = styled.h1`
  margin: 0 -16px;
  background: var(--background-secondary);
  border: 3px solid var(--color-primary);
  box-shadow: 1px 1px var(--background-primary), 4px 4px var(--color-secondary);
  border-radius: 3px;
  padding: 16px;
  text-align: center;
`;

const Link = styled.a`
  font-weight: var(--font-weight-bold);
  transition: box-shadow 400ms ease 0s;
  box-shadow: 0px 0px 0px var(--color-primary);

  &:hover {
    box-shadow: 0px 0px 0px var(--color-primary);
    transition: box-shadow 100ms ease 0s;
    box-shadow: 0px 2px 0px var(--color-primary);
  }
`;

const Image = styled.img`
  max-width: 100%;
`;

const Wrapper = styled.article`
  padding: 32px 40px;
  font-size: 1.2rem;
`;

const Blockquote = styled.blockquote`
  margin: 0;
  padding: 16px;
  font-size: 0.9em;
  background: var(--background-secondary-light);
  border-left: 3px solid var(--color-primary);
  border-radius: 3px;
`;

const Code = styled.code`
  display: inline;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 0.8em;
  padding: 2px 6px;
  margin: 1px;
  border-radius: 3px;
  background-color: var(--background-secondary-light);

  ${Blockquote} & {
    background: var(--background-primary);
  }
`;

const components = {
  h1: H1,
  a: Link,
  img: Image,
  blockquote: Blockquote,
  inlineCode: Code,
  code: CodeBlock,
  pre: props => <div {...props} />,
  wrapper: Wrapper,
};

function MDXStyles({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}

export default MDXStyles;
