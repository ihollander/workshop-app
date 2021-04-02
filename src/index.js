import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";

function setupDocument() {
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
  // add fonts, styles, etc.
  setupDocument();

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

  const { pathname } = window.location;
  if (!pathname) return;
  if (pathname.startsWith("/isolated")) {
    const filePath = pathname.replace("/isolated", "src");
    const file = fileInfo.find(f => f.filePath === filePath);
    if (file) {
      const title = exercises[file.number]?.readme?.title;
      renderIsolated(file, title);
    }
  } else {
    renderApp(exercises, projectTitle);
  }
}

function renderIsolated(file, title) {
  file.importFn().then(async module => {
    if (typeof module.default === "function") {
      // React component
      renderComponent(module.default);
    } else if (typeof module.default === "string") {
      // HTML file
      renderHTML(module.default);
    }

    if (title) {
      const newTitle = `${file.number}. ${title}`;
      if (document.title !== newTitle) {
        document.title = newTitle;
      }
    }
  });
}

function renderComponent(component) {
  const root = document.getElementById("root");
  ReactDOM.unmountComponentAtNode(root);
  ReactDOM.render(React.createElement(component), root);
}

function renderHTML(domString) {
  const domParser = new DOMParser();
  const newDocument = domParser.parseFromString(domString, "text/html");
  document.documentElement.replaceWith(newDocument.documentElement);

  // scripts need to be re-added manually so they'll actually run
  const scripts = document.querySelectorAll("script");
  for (const script of scripts) {
    const newScript = document.createElement("script");
    for (const attrName of script.getAttributeNames()) {
      newScript.setAttribute(attrName, script.getAttribute(attrName) ?? "");
    }

    // exercise scripts should all be modules, so variables get their own scope (otherwise hot reload breaks)
    newScript.setAttribute("type", "module");

    newScript.innerHTML = script.innerHTML;
    script.parentNode.insertBefore(newScript, script);
    script.remove();
  }
}

function renderApp(exercises, projectTitle) {
  if (document.documentElement !== originalDocumentElement) {
    document.documentElement.replaceWith(originalDocumentElement);
  }
  ReactDOM.render(
    <App exercises={exercises} projectTitle={projectTitle} />,
    document.getElementById("root")
  );
}

export default makeApp;
