import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Box } from "@mui/material";

import { ProductList } from "components/organisms/ProductList";
import { IProps as ProductListProps } from "components/organisms/ProductList/types";

import classes from "./scss/index.module.scss";

type OtherProductsProps = {
  products: ProductListProps["products"];
};

const OtherProducts = ({ products }: OtherProductsProps) => {
  if (!products.length) {
    return null;
  }

  return (
    <Box className={classes['product-page__other-products']}>
      <Box className="container">
        <h4 className={classes['product-page__other-products__title']}>
          <FormattedMessage defaultMessage="Other products in this category" />
        </h4>
        <ProductList products={products} />
      </Box>
    </Box>
  );
};

export default OtherProducts;
