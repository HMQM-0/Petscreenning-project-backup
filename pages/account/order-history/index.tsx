import type { NextPage, InferGetStaticPropsType } from "next";
import * as React from "react";

import { BrandingDocument, BrandingQuery } from "@generated";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { OrderHistoryPage } from "components/templates/OrderHistoryPage";

import client from "../../../apollo-client";
import { AccountSettingsLayout } from "../../../components/layouts/AccountSettingsLayout";

const OrderHistory: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ branding }) => {
  const description = "Order History";
  const title = "Order History";
  const schema = structuredData(description, title);
  const documentHead = {
    branding,
    description,
    title,
    schema,
    url: "", // TODO: Store the canonical URL either as env or in dasboard
  };

  return (
    <Layout documentHead={documentHead}>
      <AccountSettingsLayout>
        <OrderHistoryPage />
      </AccountSettingsLayout>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data: brandingData } = await client.query<BrandingQuery>({
    query: BrandingDocument,
  });

  const fallbackBranding: typeof brandingData.branding = {
    id: "",
    jsonContent: {},
    footerText: "",
  };

  return {
    props: {
      branding: brandingData?.branding ?? fallbackBranding,
    },
  };
}

export default OrderHistory;
