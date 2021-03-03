const { getAppInfo } = require("./get-app-info");

function runner() {
  const { fileInfo, imports } = getAppInfo();

  return `
import { makeApp } from "@ihollander/workshop-app";
import pkg from '../package.json'

const fileInfo = ${JSON.stringify(fileInfo, null, 2)};

if (module.hot) module.hot.accept()

makeApp({
  imports: {
    ${imports.join(",\n      ")}
  },
  fileInfo,
  projectTitle: pkg.title
});
  `;
}

module.exports = { runner };
