# Nautical - Storefront

This repo acts as the repository for Nautical Storefronts

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Git Flow

This project uses the Git branching model outlined by Vincent Driessen here: https://nvie.com/posts/a-successful-git-branching-model/

Long story short new features will flow to main through the following branches:

`new-feature` -> `dev` -> `release` -> `main`

## Preview Deployments

## Vercel Deployments

There are vercel deployments which correspond to each branch

`dev` == [foo](https://vercel.com/nautical-commerce/nautical-next-foo)

`release` == [staging](https://vercel.com/nautical-commerce/nautical-next-staging)

`main` == [makewaves](https://vercel.com/nautical-commerce/nautical-next-makewaves)

Every PR will create a preview deployment as well, which must successfully deploy before being merged into the next branch in the git flow.

## Env File Setup

You might want to extend or replace some behaviour, so you can do that by adding a `.env.local` file to your project.

- `SKIP_GRAPHQL_CODEGEN_ON_PREDEV` is a boolean that can be set to `true` to skip the graphql codegen step on the pre-start phase.
  Keep in mind that when this env is set, then you have to always generate graphql schema with `yarn generate` each time when schema is changed.

#### Social Links
To configure social links in footer, you have to set next environment variables:
- `FACEBOOK_LINK` for Facebook
- `INSTAGRAM_LINK` for Instagram
- `YOUTUBE_LINK` for YouTube
- `TIKTOK_LINK` for TikTok
- `TWITTER_LINK` for Twitter