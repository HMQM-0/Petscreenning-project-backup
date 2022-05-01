import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { useAuth } from "@nautical/react";

import { TypedFeaturedProductsQuery } from "./queries";

import { Carousel, ProductListItem } from "..";
import { generateProductUrl, maybe } from "../../core/utils";

import "./scss/index.module.scss";
import { FormattedMessage } from "react-intl";

import { useShopContext } from "components/providers/ShopProvider";

interface ProductsFeaturedProps {
  caption?: string;
  title?: string;
}

const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({
  caption,
  title,
}) => {
  const { loginForProducts } = useShopContext();
  const { user } = useAuth();

  if (!user && loginForProducts) {
    return null;
  }

  return (
    <TypedFeaturedProductsQuery displayError={false}>
      {({ data }) => {
        const products = maybe(
          () => data.shop.homepageCollection.products.edges,
          []
        );

        if (products.length) {
          return (
            <Box className="products-featured">
              <Box className="container">
                <Typography variant="h3" sx={{ fontSize: "1.5rem" }}>
                  <FormattedMessage defaultMessage="Featured Products" />
                </Typography>
                {caption ? <Box className="caption">{caption}</Box> : null}
                <Carousel>
                  {products.map(({ node: product }) => (
                    <Link
                      to={generateProductUrl(product.id, product.name)}
                      key={product.id}
                    >
                      <ProductListItem
                        product={product}
                        loginForPrice={!user && data?.shop?.loginForPrice}
                      />
                    </Link>
                  ))}
                </Carousel>
              </Box>
            </Box>
          );
        }
        return null;
      }}
    </TypedFeaturedProductsQuery>
  );
};

ProductsFeatured.defaultProps = {
  title: "Featured",
};

export default ProductsFeatured;
