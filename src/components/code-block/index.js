import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { mdx } from "@mdx-js/react";
import prismTheme from "./theme";

function CodeBlock({ children, className, live, render }) {
  const language = className.replace(/language-/, "");

  if (live) {
    return (
      <LiveProvider
        code={children.trim()}
        transformCode={code => "/** @jsx mdx */" + code}
        scope={{ mdx, React }}
        theme={prismTheme}
      >
        <LivePreview />
        <LiveEditor />
        <LiveError />
      </LiveProvider>
    );
  }

  if (render) {
    return (
      <LiveProvider code={children} theme={prismTheme}>
        <LivePreview />
      </LiveProvider>
    );
  }

  return (
    <Highlight
      {...defaultProps}
      theme={prismTheme}
      code={children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <code className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </code>
      )}
    </Highlight>
  );
}

export default CodeBlock;
