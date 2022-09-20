import { GetServerSidePropsContext } from "next";
import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";

import { getSsrApolloClient } from "src/apollo-client";
import { getSeoURL } from "src/utils";
import { AccountSettingsLayout } from "@layouts/AccountSettingsLayout";
import { AccountPageDocument, AccountPageQuery } from "src/components/templates/AccountPage/queries.graphql.generated";
import { AccountPage } from "src/components/templates/AccountPage";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";

const Account: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ documentHead }) => {
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

  const url = getSeoURL(context);
  const description = "Account Page";
  const title = "Account";
  const schema = structuredData(description, title, url);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    url,
  };

  return {
    props: {
      documentHead,
      __APOLLO__,
    },
  };
};

export default Account;
