import type { NextPage, InferGetStaticPropsType } from "next";

import {
  BrandingDocument,
  BrandingQuery,
  HomePageDocument,
  HomePageQuery,
} from "@generated";
import { Layout } from "@layout";
import { IndexPage } from "components/templates/IndexPage";
import { structuredData } from "components/templates/IndexPage/structuredData";

import client from "../apollo-client";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  branding,
  homepage,
}) => {
  const description = homepage?.shop.description ?? "";
  const title = homepage?.shop.name ?? "";
  const schema = structuredData(description, title);
  const documentHead = {
    branding,
    description,
    title,
    schema,
    image: homepage.shop.homepageCollection?.backgroundImage?.url ?? "", // TODO: Ensure every page has a valid Image for OG tags
    url: "", // TODO: Store the canonical URL either as env or in dasboard
  };

  return (
    <Layout documentHead={documentHead}>
      <IndexPage data={homepage} />
    </Layout>
  );
};

export async function getStaticProps() {
  const { data: brandingData } = await client.query<BrandingQuery>({
    query: BrandingDocument,
  });
  const { data: homepageData } = await client.query<HomePageQuery>({
    query: HomePageDocument,
  });

  const fallbackBranding: typeof brandingData.branding = {
    id: "",
    jsonContent: {},
    footerText: "",
  };

  return {
    props: {
      branding: brandingData?.branding ?? fallbackBranding,
      homepage: homepageData,
    },
  };
}

export default Home;
