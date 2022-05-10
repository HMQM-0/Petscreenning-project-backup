import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import Link from "next/link";

import { useShopContext } from "components/providers/ShopProvider";
import { useSetSEO } from "@providers";
import { useHomeQuery } from "@generated";
import { generateProductsUrl } from "core/utils";

import { structuredData } from "./structuredData";
// import StorePage from "../Builder/StorePage";
import classes from "./scss/index.module.scss";
import { parseHomePageCollectionJson } from "./helpers";

const IndexPage = () => {
  const intl = useIntl();
  const { builderKey } = useShopContext();
  const { data, loading } = useHomeQuery();
  const setSeo = useSetSEO();

  const description = data?.shop.description ?? "";
  const title = data?.shop.name ?? "";
  const schema = structuredData(description, title);

  const backgroundImage =
    data?.shop.homepageCollection?.backgroundImage ?? null;
  const categories = data?.categories?.edges ?? [];

  React.useEffect(() => {
    setSeo((seo) => ({ ...seo, description, title, schema }));
  }, [description, schema, setSeo, title]);

  return (
    <Box className={classes["home-page"]}>
      {builderKey ? (
        // <StorePage landing={builderLandingData} />
        <>BUILDER</>
      ) : (
        <>
          <Box
            className={classes["home-page__hero"]}
            style={
              backgroundImage
                ? { backgroundImage: `url(${backgroundImage.url})` }
                : undefined
            }
          >
            <Box className={classes["home-page__hero-text"]}>
              <Box>
                <Box
                  component="span"
                  className={classes["home-page__hero__title"]}
                >
                  <Box className={classes["home-page__hero__title__block"]}>
                    <Box
                      className={classes["home-page__hero__title__leftline"]}
                    />
                    <Typography variant="h1">
                      {parseHomePageCollectionJson(
                        data?.shop.homepageCollection?.descriptionJson
                      )}
                    </Typography>
                    <Box
                      className={classes["home-page__hero__title__rightline"]}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes["home-page__hero-action"]}>
              <Link href={generateProductsUrl()}>
                <a>
                  <Button color="secondary" variant="contained">
                    Explore Products
                  </Button>
                </a>
              </Link>
            </Box>
          </Box>

          {/* <ProductsFeatured
        title={intl.formatMessage({ defaultMessage: "Featured Products" })}
        caption="New, trending, and on-sale this month"
      /> */}
          {categories.length > 0 && (
            <Box className={classes["home-page__categories"]}>
              <Box className={"container"}>
                <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
                  <FormattedMessage defaultMessage="Shop by category" />
                </Typography>
                <Box className={classes["caption"]}>
                  Check out the hottest categories on the move now
                </Box>

                <Box className={classes["home-page-category-blocks"]}>
                  {categories.map(({ node: category }) => (
                    <>{category.name}</>
                    // <CategoryBlock key={category.id} category={category} />
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export { IndexPage };
