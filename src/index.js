import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import App from "./react-app/app";

/* 
TODOS
- code organization?
- re-rendering - unmount?
- history location change - prevent unneeded rerenders and fix back button
- load CSS styles
*/
function addFonts() {
  const preconnect = document.createElement("link");
  preconnect.rel = "preconnect";
  preconnect.href = "https://fonts.gstatic.com";
  document.head.append(preconnect);
  const fontLink = document.createElement("link");
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Fira+Code&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap";
  fontLink.rel = "stylesheet";
  document.head.append(fontLink);
  if (window.frameElement) {
    const style = document.createElement("style");
    style.innerHTML = `body{margin:0;} #root{display:grid;place-items:center;height:100vh;}`;
    document.head.append(style);
  }
}

const originalDocumentElement = document.documentElement;

function makeApp({ imports, fileInfo, projectTitle }) {
  // add fonts
  addFonts();

  // build navigation
  const exercises = [];

  for (const info of fileInfo) {
    exercises[info.number] = exercises[info.number] || {};
    if (["exercise", "readme", "solution"].includes(info.type)) {
      info.importFn = imports[info.id];
      if (info.type === "solution") {
        exercises[info.number][info.type] =
          exercises[info.number][info.type] || [];
        exercises[info.number][info.type].push(info);
      } else {
        exercises[info.number][info.type] = info;
      }
    }
  }

  // create history and listen for changes
  // use this for the 'isolated' version of the site, which is useful for dev tools debugging
  const history = createBrowserHistory();
  let previousLocation = history.location;
  history.listen(handleLocationChange);
  handleLocationChange();

  // when location changes, either run in 'isolated' mode or render the workshop app
  function handleLocationChange(location = history.location) {
    const { pathname } = location;
    if (!pathname) return;
    let file;
    if (pathname?.startsWith("/isolated")) {
      // render isolated component
      const filePath = pathname.replace("/isolated", "src");
      file = fileInfo.find(f => f.filePath === filePath);
      if (file) {
        renderIsolated(file);
      }
    } else {
      const number = Number(pathname.split("/").slice(-1)[0]);
      file = fileInfo.find(f => f.type === "readme" && f.number === number);
      renderReact();
    }

    // set title
    // setTimeout(() => {
    const title = fileInfo.find(
      f => f.number === file?.number && f.type === "readme"
    )?.title;
    if (file && title) {
      const newTitle = `${file.number}. ${title}`;
      if (document.title !== newTitle) {
        document.title = newTitle;
      }
    }
    // }, 100);

    previousLocation = location;
  }

  // this is actually gonna render every exercise and solution (in an iframe or in the window)
  function renderIsolated(file) {
    if (history.location !== previousLocation) return;

    file.importFn().then(async module => {
      if (typeof module.default === "function") {
        // React component
        const component = React.createElement(module.default);
        render(component);
      } else if (typeof module.default === "string") {
        // HTML file
        const domParser = new DOMParser();
        const newDocument = domParser.parseFromString(
          module.default,
          "text/html"
        );
        document.documentElement.replaceWith(newDocument.documentElement);

        // scripts need to be added manually so they'll actually run
        const scripts = document.querySelectorAll("script");
        for (const script of scripts) {
          const newScript = document.createElement("script");
          for (const attrName of script.getAttributeNames()) {
            // if (attrName === "src") {
            //   // resolve path from src
            //   const something = await import("../solution/temp/test.js");
            // } else {
            // }
            newScript.setAttribute(
              attrName,
              script.getAttribute(attrName) ?? ""
            );
          }
          newScript.innerHTML = script.innerHTML;
          script.parentNode.insertBefore(newScript, script);
          script.remove();
        }
      }
    });
  }

  function render(ui) {
    const root = document.getElementById("root");
    ReactDOM.unmountComponentAtNode(root);
    ReactDOM.render(ui, root);
  }

  function renderReact() {
    if (document.documentElement !== originalDocumentElement) {
      document.documentElement.replaceWith(originalDocumentElement);
    }
    ReactDOM.render(
      <App exercises={exercises} projectTitle={projectTitle} />,
      document.getElementById("root")
    );
  }
}

export { makeApp };
