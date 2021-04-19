import React, { useState, useEffect } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { mdx } from "@mdx-js/react";
import prismTheme from "./theme";
import styled, { ThemeProvider } from "styled-components";

function transformCode(code) {
  // no imports allowed in react-live
  return code.replace(/import(.*)\n/g, "");
}

// scope available in LiveProvider
const scope = { mdx, styled, ThemeProvider, React, useState, useEffect };

function CodeBlock({ children, className, live, render }) {
  const language = className.replace(/language-/, "");
  const code = children.trim();

  if (live) {
    return (
      <LiveProvider
        code={code}
        transformCode={transformCode}
        scope={scope}
        theme={prismTheme}
        noInline={true}
      >
        <Wrapper>
          <Flag>Edit Me</Flag>
          <CodeWrapper>
            <LiveEditor />
            <Error />
          </CodeWrapper>
        </Wrapper>
        <Wrapper>
          <Flag>Result</Flag>
          <CodeWrapper>
            <LivePreview />
          </CodeWrapper>
        </Wrapper>
      </LiveProvider>
    );
  }

  if (render) {
    return (
      <LiveProvider
        code={code}
        transformCode={transformCode}
        scope={scope}
        theme={prismTheme}
      >
        <LivePreview />
      </LiveProvider>
    );
  }

  return (
    <Wrapper>
      <Flag>{language}</Flag>
      <CodeWrapper>
        <Highlight
          {...defaultProps}
          language={language}
          code={code}
          theme={prismTheme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre>
              <code className={className} style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </CodeWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const Flag = styled.div`
  position: absolute;
  top: -22px;
  right: 10px;
  font-size: 14px;
  background: var(--color-primary);
  padding: 4px 8px;
  color: white;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

const CodeWrapper = styled.div`
  margin: 32px -16px;
  padding: 16px;
  background: var(--background-code);
  border: 3px solid var(--color-primary);
  box-shadow: 1px 1px var(--background-primary), 4px 4px var(--color-secondary);
  border-radius: 3px;
  font-size: 0.8em;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  overflow: auto;
`;

export const Error = styled(LiveError)`
  color: red;
  padding: 16px;
  margin: 0;
  overflow: auto;
`;

export default CodeBlock;
