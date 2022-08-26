import type { NextPage, InferGetServerSidePropsType } from "next";

import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { getApolloClient } from "apollo-client";
import { AddressBookPage } from "components/templates/AddressBookPage";
import { AccountSettingsLayout } from "components/layouts/AccountSettingsLayout";
import {
  AddressBookPageDocument,
  AddressBookPageQuery,
} from "components/templates/AddressBookPage/queries.graphql.generated";

const AddressBook: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
  const description = "Address Book";
  const title = "Address Book";
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
        <AddressBookPage />
      </AccountSettingsLayout>
    </Layout>
  );
};

export async function getServerSideProps() {
  const client = getApolloClient();

  const { data } = await client.query<AddressBookPageQuery>({
    query: AddressBookPageDocument,
  });

  return {
    props: {
      data,
    },
  };
}

export default AddressBook;
