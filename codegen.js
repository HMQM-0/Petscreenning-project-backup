const nextEnv = require("@next/env");
const env = nextEnv.loadEnvConfig(".");

module.exports = {
  schema: env.combinedEnv.NEXT_PUBLIC_API_URI,
  documents: ["./**/*.graphql.ts"],
  generates: {
    "graphql/generated.ts": {
      plugins: ["typescript"],
    },
    "./": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.tsx",
        baseTypesPath: "graphql/generated.ts",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
      config: {
        withHooks: true,
      },
    },
  },
};
