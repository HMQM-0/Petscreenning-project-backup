import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQueryParam, BooleanParam } from "next-query-params";

import { useAuth } from "nautical-api";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import {
  CheckoutPageDocument,
  CheckoutPageQuery,
} from "components/templates/CheckoutPage/queries.graphql.generated";
import { CheckoutPage } from "components/templates/CheckoutPage";
import { Logo } from "components/atoms/Logo";

import { getApolloClient } from "../apollo-client";

const Checkout: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  const { push } = useRouter();
  const { user } = useAuth();
  const [guest] = useQueryParam("guest", BooleanParam);
  const description = data?.shop.description ?? "";
  const title = data?.shop.name ?? "";
  const schema = structuredData(description, title);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    image: data.branding?.logo ?? "",
    url: "", // TODO: Store the canonical URL either as env or in dasboard
  };

  // TODO: Determine if this can be done Server-Side to improve UX
  if (!user && !guest) {
    push("/login");
  }

  const logo = <Logo {...data.branding} />;

  return (
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
