if (!process.env.NEXT_PUBLIC_BUILDER_KEY) {
  throw new Error("Missing env varialbe NEXT_PUBLIC_BUILDER_KEY");
}

const config = {
  apiKey: process.env.NEXT_PUBLIC_BUILDER_KEY,
  storeModel: "store",
};

export default config;
