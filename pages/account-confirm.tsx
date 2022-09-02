import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { GetServerSidePropsContext } from "next";

import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import AccountConfirm from "components/templates/AccountConfirmPage";
import { getApolloClient } from "apollo-client";
import NotFound from "components/molecules/NotFound";
import { getSeoURL } from "utils";

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ email, token, documentHead }) => {
  const showAccountConfirm = email && token && typeof email === "string" && typeof token === "string";

  return (
    <Layout documentHead={documentHead}>
      {showAccountConfirm ? <AccountConfirm email={email} token={token} /> : <NotFound />}
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const client = getApolloClient();
  const __APOLLO__: NormalizedCacheObject = client.extract();

  const { email = null, token = null } = context.query;

  const url = getSeoURL(context);
  const description = "Account Confirmation";
  const title = "Account Confirmation";
  const schema = structuredData(description, title, url);
  const documentHead = {
    branding: {
      footerText: "",
      jsonContent: "{}",
    },
    description,
    title,
    schema,
    image: "",
    url,
  };

  return {
    props: {
      email,
      token,
      documentHead,
      __APOLLO__,
    },
  };
};

export default Home;
