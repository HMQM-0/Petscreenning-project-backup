import { GetServerSidePropsContext } from "next";
import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { AccountSettingsLayout } from "@layouts/AccountSettingsLayout";
import { AccountPageDocument, AccountPageQuery } from "components/templates/AccountPage/queries.graphql.generated";
import { AccountPage } from "components/templates/AccountPage";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import { getSsrApolloClient } from "apollo-client";

const Account: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
  const description = "Account Page";
  const title = "Account";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url: "",
  };

  return (
    <Layout documentHead={documentHead}>
      <AccountSettingsLayout>
        <AccountPage />
      </AccountSettingsLayout>
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const client = getSsrApolloClient(context);

  const { data } = await client.query<AccountPageQuery>({
    query: AccountPageDocument,
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  return {
    props: {
      data,
      __APOLLO__,
    },
  };
};

export default Account;
