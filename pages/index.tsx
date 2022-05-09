import type { NextPage, InferGetStaticPropsType } from "next";

import { BrandingDocument, BrandingQuery } from "@generated";
import { Layout } from "@layout";
import { IndexPage } from "components/templates/IndexPage";

import client from "../apollo-client";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  branding,
}) => {
  return (
    <Layout branding={branding}>
      <IndexPage />
    </Layout>
  );
};

export async function getStaticProps() {
  const { data } = await client.query<BrandingQuery>({
    query: BrandingDocument,
  });

  const fallbackBranding: typeof data.branding = {
    id: "",
    jsonContent: {},
    footerText: "",
  };

  return {
    props: {
      branding: data?.branding ?? fallbackBranding,
    },
  };
}

export default Home;
