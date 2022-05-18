import * as React from "react";

import Page from "./Page";

import { Layout } from "../../../components/layouts/Layout";
import { structuredData } from "../../../components/templates/IndexPage/structuredData";
import { AccountSettingsLayout } from "../../../components/layouts/AccountSettingsLayout";

interface GeneralAccountProps {
  logo: string;
  // TODO: where to get it? What is the type of it?
  branding: any;
}

const View: React.FC<any> = ({ logo, branding = {} }: GeneralAccountProps) => {
  const documentHead = {
    branding,
    description: "description",
    title: "title",
    schema: structuredData("description", "title"),
    image: "", // TODO: Ensure every page has a valid Image for OG tags
    url: "", // TODO: Store the canonical URL either as env or in dasboard
  };

  return (
    <Layout documentHead={documentHead}>
      <AccountSettingsLayout>
        <Page />
      </AccountSettingsLayout>
    </Layout>
  );
};

export default View;
