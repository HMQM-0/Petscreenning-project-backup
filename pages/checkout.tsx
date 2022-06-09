import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import Image from "next/image";

import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import logoImg from "deprecated/images/wine-logo.png";
import {
  CheckoutPageDocument,
  CheckoutPageQuery,
} from "components/templates/CheckoutPage/queries.graphql.generated";
import { CheckoutPage } from "components/templates/CheckoutPage";

import { getApolloClient } from "../apollo-client";

const Checkout: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const description = data?.shop.description ?? "";
  const title = data?.shop.name ?? "";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    image: "", // TODO: Ensure every page has a valid Image for OG tags
    url: "", // TODO: Store the canonical URL either as env or in dasboard
  };

  const logo = data?.branding?.logo ? (
    <Image
      src={data.branding.logo.url}
      width={data.branding.logoWidth ?? 188}
      height={data.branding.logoHeight ?? 28}
      objectFit="contain"
      alt="Logo"
    />
  ) : (
    <Image
      width={188}
      height={28}
      objectFit="contain"
      src={logoImg}
      alt="Default logo"
    />
  );

  return (
    // @ts-ignore TODO: BE issue BrandingFragment cannot be null | undefined
    <Layout documentHead={documentHead}>
      <CheckoutPage logo={logo} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const client = getApolloClient();

  const { data } = await client.query<CheckoutPageQuery>({
    query: CheckoutPageDocument,
  });

  const __APOLLO__: NormalizedCacheObject = client.extract();

  return {
    props: {
      data,
      __APOLLO__,
    },
  };
};

export default Checkout;
