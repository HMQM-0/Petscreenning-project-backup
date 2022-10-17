import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

import { getApolloClient } from "src/apollo-client";
import { getSeoURL } from "src/utils";
import { Layout } from "src/components/layouts/Layout";
import { structuredData } from "src/components/templates/IndexPage/structuredData";
import { AddressBookPage } from "src/components/templates/AddressBookPage";
import { AccountSettingsLayout } from "src/components/layouts/AccountSettingsLayout";
import {
  AddressBookPageDocument,
  AddressBookPageQuery,
} from "src/components/templates/AddressBookPage/queries.graphql.generated";

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
