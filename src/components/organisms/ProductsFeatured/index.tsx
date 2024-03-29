import * as React from "react";
import { Box, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import Link from "next/link";

import { useFeaturedProductsQuery } from "src/components/organisms/ProductsFeatured/queries.graphql.generated";
import Carousel from "src/components/atoms/Carousel";
import { ProductListItem } from "src/components/organisms/index";
import { useAuth } from "nautical-api";
import { generateProductUrl } from "src/core/utils";
import { useShopContext } from "src/components/providers/ShopProvider";

import classes from "./scss/index.module.scss";

interface ProductsFeaturedProps {
  caption?: string;
  title?: string;
}

const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({ caption, title }) => {
  const { loginForProducts } = useShopContext();
  const { user } = useAuth();

  const { data } = useFeaturedProductsQuery();

  if (!user && loginForProducts) {
    return null;
  }

  const products = data?.shop?.homepageCollection?.products?.edges ?? [];

  if (!products.length) {
    return null;
  }

  return (
    <Box className={classes["products-featured"]}>
      <Box className="container">
        <Typography
          variant="h3"
          sx={{ fontSize: "1.5rem" }}
        >
          {title || <FormattedMessage defaultMessage="Featured Products" />}
        </Typography>
        {caption ? <Box className={classes.caption}>{caption}</Box> : null}
        <Carousel>
          {products.map(({ node: product }) => (
            <Link
              href={generateProductUrl(product.id, product.name)}
              key={product.id}
            >
              <a>
                <ProductListItem
                  product={product}
                  loginForPrice={!user && !!data?.shop?.loginForPrice}
                />
              </a>
            </Link>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default ProductsFeatured;
