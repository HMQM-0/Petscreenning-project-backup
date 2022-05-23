const nextEnv = require("@next/env");
const env = nextEnv.loadEnvConfig(".");

module.exports = {
  schema: env.combinedEnv.NEXT_PUBLIC_API_URI,
  documents: ["./**/*.graphql.ts"],
  generates: {
    "graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};
