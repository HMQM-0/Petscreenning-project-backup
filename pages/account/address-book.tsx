import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getApolloClient } from "apollo-client";
import { AddressBookPage } from "components/templates/AddressBookPage";
import { AccountSettingsLayout } from "components/layouts/AccountSettingsLayout";
import {
  AddressBookPageDocument,
  AddressBookPageQuery,
} from "components/templates/AddressBookPage/queries.graphql.generated";
import { getSeoURL } from "utils";

const AddressBook: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ documentHead }) => {
  return (
    <Layout documentHead={documentHead}>
      <AccountSettingsLayout>
        <AddressBookPage />
      </AccountSettingsLayout>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = getApolloClient();

  const { data } = await client.query<AddressBookPageQuery>({
    query: AddressBookPageDocument,
  });

  const url = getSeoURL(context);
  const description = "Address Book";
  const title = "Address Book";
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
    },
  };
}

export default AddressBook;
