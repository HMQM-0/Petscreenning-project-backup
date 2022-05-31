# Nautical - Storefront

This repo acts as the repository for Nautical Storefronts

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Env File Setup

You might want to extend or replace some behaviour, so you can do that by adding a `.env.local` file to your project.

- `SKIP_GRAPHQL_CODEGEN_ON_PREDEV` is a boolean that can be set to `true` to skip the graphql codegen step on the pre-start phase.
Keep in mind that when this env is set, then you have to always generate graphql schema with `yarn generate` each time when schema is changed.
