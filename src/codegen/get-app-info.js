// this will run at build time to evaluate what files are part of the workshop
// used with our codegen runner
const glob = require("glob");
const path = require("path");
const fs = require("fs");

function loadFiles() {
  const cwd = process.cwd();
  const fileInfo = glob
    // find files from predefined directories
    .sync("src/{exercise,solution,examples}/*.+(js|html|md|mdx)", {
      cwd,
    })
    // parse file details
    .map(filePath => {
      const fullFilePath = path.join(cwd, filePath);
      const { dir, name, ext } = path.parse(fullFilePath);
      // type can either come from the directory name (exercise, solution, examples)
      let type = path.basename(dir);
      let title;
      // or type can come from the file extension (readme)
      if (ext === ".md" || ext === ".mdx") {
        type = "readme";
        const contents = String(fs.readFileSync(fullFilePath));
        const [firstLine] = contents.split(/\r?\n/);
        const titleMatch = firstLine.match(/# (?<title>.*)$/);
        title = titleMatch?.groups?.title || "";
      }
      // exercise number for navigation
      const number = Number(name.match(/(?<num>^\d+)/)?.groups.num || 0);
      const isExtraCredit = name.includes(".extra-");
      const extraCreditNumber = isExtraCredit
        ? Number((name.match(/(\d+$)/) ?? [null])[0])
        : 0;
      // todo: get title from file contents || file name?
      return {
        id: filePath,
        fullFilePath,
        filePath,
        ext,
        fileName: name,
        type,
        number,
        isolatedPath: filePath.replace("src", "/isolated"),
        title,
        isExtraCredit,
        extraCreditNumber,
      };
    });

  return fileInfo;
}

function getAppInfo() {
  const fileInfo = loadFiles();
  // dynamically generate an import for each file
  // must return a string that will go thru the codegen.macro
  const imports = fileInfo.map(({ id, filePath, ext }) => {
    // use webpack loaders for non-JS files
    let loaders = "";
    if (ext === ".html") {
      loaders = "!raw-loader!";
    } else if (ext === ".md" || ext === ".mdx") {
      loaders = "!babel-loader!@mdx-js/loader!";
    }

    const relativePath = filePath.replace("src/", "./");
    // return import fn in a way we can use with React.Lazy
    // https://reactjs.org/docs/code-splitting.html#reactlazy
    return `"${id}": () => import("${loaders}${relativePath}")`;
  });

  return { fileInfo, imports };
}

module.exports = { getAppInfo };
