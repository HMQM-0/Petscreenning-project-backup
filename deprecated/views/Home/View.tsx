import "./scss/index.module.scss";

import * as React from "react";
import { Box } from "@mui/material";
import { useQuery } from "@apollo/client";

import { useShopContext } from "components/providers/ShopProvider";

import Page from "./Page";
import { builderHomePageQuery, TypedHomePageQuery } from "./queries";

import { MetaWrapper } from "../../components";
import StorePage from "../Builder/StorePage";

const View: React.FC = () => {
  const { builderKey } = useShopContext();

  const { data: builderLandingData } = useQuery(builderHomePageQuery);

  return (
    <Box className="home-page">
      <TypedHomePageQuery /* alwaysRender displayLoader={false} errorPolicy="all" */
      >
        {({ data, loading }) => {
          return (
            <MetaWrapper
              meta={{
                description: data.shop ? data.shop.description : "",
                title: data.shop ? data.shop.name : "",
              }}
            >
              {builderKey ? (
                <StorePage landing={builderLandingData} />
              ) : (
                <Page
                  loading={loading}
                  backgroundImage={
                    data.shop &&
                    data.shop.homepageCollection &&
                    data.shop.homepageCollection.backgroundImage
                  }
                  categories={data.categories}
                  // collections={data.collections}
                  shop={data.shop}
                />
              )}
            </MetaWrapper>
          );
        }}
      </TypedHomePageQuery>
    </Box>
  );
};

export default View;
