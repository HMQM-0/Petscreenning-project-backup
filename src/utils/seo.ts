import { GetServerSidePropsContext } from "next";

export const getSeoURL = (ctx: GetServerSidePropsContext) => {
  const { req } = ctx;
  return `${req.headers.host}${ctx.resolvedUrl}`;
};
