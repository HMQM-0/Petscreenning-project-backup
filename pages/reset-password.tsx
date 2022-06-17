import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { GetServerSidePropsContext } from "next";

import { ResetPasswordPage } from "components/templates/ResetPasswordPage";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import { getApolloClient } from "apollo-client";
import NotFound from "components/molecules/NotFound";

const ResetPassword: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ email, token }) => {
  const description = "Reset Password";
  const title = "Reset Password";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: {
      footerText: "",
      jsonContent: "{}",
    },
    description,
    title,
    schema,
    image: "",
    url: "",
  };

  const showResetPassword = email && token && typeof email === 'string' && typeof token === 'string';

  return (
    <Layout documentHead={documentHead}>
      {showResetPassword ? (
        <ResetPasswordPage email={email} token={token} />
      ) : (
        <NotFound />
      )}
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const client = getApolloClient();
  const __APOLLO__: NormalizedCacheObject = client.extract();

  const { email = null, token = null } = context.query;

  return {
    props: {
      email,
      token,
      __APOLLO__,
    },
  };
};

export default ResetPassword;
