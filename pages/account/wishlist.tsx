import type { NextPage, InferGetStaticPropsType } from "next";

import { BrandingDocument, BrandingQuery } from "@generated";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import client from "apollo-client";
import { WishlistPage } from "components/templates/WishlistPage";
import { AccountSettingsLayout } from "components/layouts/AccountSettingsLayout";

const Wishlist: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  branding,
}) => {
  const description = "Wishlist";
  const title = "Wishlist";
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
        <WishlistPage />
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

export default Wishlist;
