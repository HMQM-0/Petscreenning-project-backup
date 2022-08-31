import type { NextPage, InferGetServerSidePropsType } from "next";
import { NormalizedCacheObject } from "@apollo/client";
import { useRouter } from "next/router";
import { useQueryParams, BooleanParam, StringParam } from "next-query-params";

import { useAuth, useCheckout } from "nautical-api";
import { structuredData } from "components/templates/IndexPage/structuredData";
import { Layout } from "@layouts/Layout";
import { CheckoutPageDocument, CheckoutPageQuery } from "components/templates/CheckoutPage/queries.graphql.generated";
import { CheckoutPage } from "components/templates/CheckoutPage";
import { Logo } from "components/atoms/Logo";
import { getPayment, IS_SSR } from "utils";

import { getApolloClient } from "../apollo-client";

const Checkout: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
  const { push } = useRouter();
  const { user } = useAuth();
  const { loaded, lines } = useCheckout();

  const [{ payment_intent, payment_intent_client_secret, guest }] = useQueryParams({
    payment_intent: StringParam,
    payment_intent_client_secret: StringParam,
    guest: BooleanParam,
  });
  const URL = IS_SSR ? "" : location.href;
  const payment = getPayment();
  const description = data?.shop.description ?? "";
  const title = data?.shop.name ?? "";
  const schema = structuredData(description, title, URL);
  const documentHead = {
    branding: data.branding,
    description,
    title,
    schema,
    image: data.branding?.logo ?? "",
    url: "", // TODO: Store the canonical URL either as env or in dasboard
  };

  const isFinalizingPayment = (payment_intent && payment_intent_client_secret) || payment?.token;
  const redirectToCart = !isFinalizingPayment && loaded && (!lines || lines.length === 0);
  if (!IS_SSR) {
    if (redirectToCart) {
      push("/cart");
    }
    if (!user && !guest && !isFinalizingPayment && !redirectToCart) {
      push("/login");
    }
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
