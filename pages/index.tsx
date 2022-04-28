import type { NextPage, InferGetStaticPropsType } from "next";
import { useAlert } from "react-alert";
import { useEffect } from "react";

import { BrandingDocument, BrandingQuery } from "@generated";
import { useSetSEO } from "@providers";
import { Layout } from "@layout";

import client from "../apollo-client";

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  branding,
}) => {
  const alert = useAlert();
  const setSeo = useSetSEO();

  useEffect(() => {
    setSeo((seo) => ({ ...seo, title: "Home" }));
  }, [setSeo]);

  return (
    <Layout branding={branding}>
      <div>UOUOUO</div>
      <button
        onClick={() =>
          alert.show(
            {
              // @ts-ignore
              title: "Added 1x pp",
            },
            { type: "success" }
          )
        }
      >
        CLICK
      </button>
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
