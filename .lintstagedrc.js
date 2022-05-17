const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "**/*.(ts|tsx)": [
    buildEslintCommand,
    "pretty-quick --staged",
    "tsc-files --noEmit --pretty next-env.d.ts alert.d.ts",
  ],
};
