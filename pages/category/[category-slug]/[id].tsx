import type { NextPage, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import { BrandingDocument, BrandingQuery } from "@generated";
import { Layout } from "components/layouts/Layout";
import { structuredData } from "components/templates/IndexPage/structuredData";
import client from "apollo-client";
import { ProductsPage } from "components/templates/ProductsPage";
import { Loader } from "components/atoms/Loader";

type CategoryPageProps = InferGetStaticPropsType<typeof getStaticProps>;

// TODO: InferGetStaticPropsType does not work correctly in case of getStaticPaths -> fallback:true
//  adding `| {}` manually as explained here
//  https://github.com/vercel/next.js/issues/18705
const Category: NextPage<CategoryPageProps | {}> = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    // Showing Loader until branding is still in progress for fallback routes
    return (<Loader />);
  }

  const { branding } = props as CategoryPageProps;

  const description = "Category"; // TODO: insert category name here?
  const title = "Category"; // TODO: insert category name here?
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
      {/* TODO: To be replaced with category page */}
      <ProductsPage />
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

  console.log('brandingData?.branding', brandingData?.branding);

  return {
    props: {
      branding: brandingData?.branding ?? fallbackBranding,
    },
  };
}

export async function getStaticPaths() {
  // TODO: Load all available categories here?
  return {
    paths: [],
    fallback: true,
  };
}

export default Category;
