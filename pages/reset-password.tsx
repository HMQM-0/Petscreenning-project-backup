import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { GetServerSidePropsContext } from "next";

import {
  ResetPasswordPageDocument,
  ResetPasswordPageQuery,
} from "components/templates/ResetPasswordPage/queries.graphql.generated";
import { ResetPasswordPage } from "components/templates/ResetPasswordPage";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import { getApolloClient } from "apollo-client";
import NotFound from "components/molecules/NotFound";
import { getSeoURL, IS_SSR } from "utils";

const ResetPassword: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  email,
  token,
  documentHead,
}) => {
  const showResetPassword = email && token && typeof email === "string" && typeof token === "string";

  return (
    <Layout documentHead={documentHead}>
      {showResetPassword ? <ResetPasswordPage email={email} token={token} /> : <NotFound />}
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const client = getApolloClient();

  const { data } = await client.query<ResetPasswordPageQuery>({
    query: ResetPasswordPageDocument,
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  const { email = null, token = null } = context.query;
  const url = getSeoURL(context);
  const description = "Reset Password";
  const title = "Reset Password";
  const schema = structuredData(description, title, url);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    image: data.branding?.logo?.url ?? "",
    url,
  };

  return {
    props: {
      documentHead,
      email,
      token,
      __APOLLO__,
    },
  };
};

export default ResetPassword;
