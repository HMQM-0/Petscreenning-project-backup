import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Box } from "@mui/material";

import { ProductList } from "src/components/organisms/ProductList";
import { IProps as ProductListProps } from "src/components/organisms/ProductList/types";

import classes from "./scss/index.module.scss";

type OtherProductsProps = {
  products: ProductListProps["products"];
};

const OtherProducts = ({ products }: OtherProductsProps) => {
  if (!products.length) {
    return <></>;
  }

  return (
    <Box className={classes.productPage__otherProducts}>
      <Box className="container">
        <h4 className={classes.productPage__otherProducts__title}>
          <FormattedMessage defaultMessage="Other products in this category" />
        </h4>
        <ProductList products={products} />
      </Box>
    </Box>
  );
};

export default OtherProducts;
