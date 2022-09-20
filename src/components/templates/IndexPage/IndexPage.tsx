import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import Link from "next/link";
import { BuilderContent } from "@builder.io/sdk";
import dynamic from "next/dynamic";

import CategoryBlock from "src/components/atoms/CategoryBlock";
import ProductsFeatured from "src/components/organisms/ProductsFeatured";
import { generateProductsUrl } from "src/core/utils";

import classes from "./scss/index.module.scss";
import { HomeQuery } from "./queries.graphql.generated";

const Builder = dynamic(() => import("./Builder"), { ssr: false });

// Add typed-prop for json
export const parseHomePageCollectionJson = (descriptionJson: any): string => {
  if (!descriptionJson) {
    return "";
  }

  // Need to type this data
  const object = JSON.parse(descriptionJson);
  return object?.blocks?.[0]?.text ?? "";
};

type IndexPageProps = {
  data: HomeQuery;
  builderContent: BuilderContent | null;
};

const IndexPage = ({ data, builderContent }: IndexPageProps) => {
  const intl = useIntl();
  const backgroundImage = data?.shop.homepageCollection?.backgroundImage ?? null;
  const categories = data?.categoryList?.categories ?? [];

  return (
    <Box className={classes["home-page"]}>
      {builderContent ? (
        <Builder
          content={builderContent}
          data={data}
        />
      ) : (
        <>
          <Box
            className={classes["home-page__hero"]}
            style={backgroundImage ? { backgroundImage: `url(${backgroundImage.url})` } : undefined}
          >
            <Box className={classes["home-page__hero-text"]}>
              <Box>
                <Box
                  component="span"
                  className={classes["home-page__hero__title"]}
                >
                  <Box className={classes["home-page__hero__title__block"]}>
                    <Box className={classes["home-page__hero__title__leftline"]} />
                    <Typography variant="h1">
                      {parseHomePageCollectionJson(data?.shop.homepageCollection?.descriptionJson)}
                    </Typography>
                    <Box className={classes["home-page__hero__title__rightline"]} />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes["home-page__hero-action"]}>
              <Link href={generateProductsUrl()}>
                <a>
                  <Button
                    color="secondary"
                    variant="contained"
                  >
                    Explore Products
                  </Button>
                </a>
              </Link>
            </Box>
          </Box>

          <ProductsFeatured
            title={intl.formatMessage({ defaultMessage: "Featured Products" })}
            caption="New, trending, and on-sale this month"
          />
          {categories.length > 0 && (
            <Box className={classes["home-page__categories"]}>
              <Box className={"container"}>
                <Typography
                  variant="h3"
                  sx={{ fontSize: "1.5rem" }}
                >
                  <FormattedMessage defaultMessage="Shop by category" />
                </Typography>
                <Box className={classes["caption"]}>Check out the hottest categories on the move now</Box>

                <Box className={classes["home-page-category-blocks"]}>
                  {categories.map(({ category }) => (
                    <CategoryBlock
                      key={category.id}
                      category={category}
                    />
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
