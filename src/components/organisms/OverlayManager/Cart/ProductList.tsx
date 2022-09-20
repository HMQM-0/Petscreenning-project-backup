import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Box, IconButton } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Link from "next/link";

import { TaxedMoney } from "src/components/molecules/TaxedMoney/TaxedMoney";
import { Thumbnail } from "src/components/molecules/Thumbnail/Thumbnail";
import { generateProductUrl } from "src/core/utils";
import { ICheckoutModelLine } from "src/components/providers/Nautical/Checkout/types";

import classes from "./scss/index.module.scss";

type ProductListProps = {
  lines: ICheckoutModelLine[];
  remove(variantId: string): void;
};

const ProductList = ({ lines, remove }: ProductListProps) => (
  <ul className={classes.cart__list}>
    {lines.map((line, index) => {
      const productUrl = generateProductUrl(line.variant.product?.id ?? "", line.variant.product?.name ?? "");
      const key = line.id ? `id-${line.id}` : `idx-${index}`;

      return (
        <li
          key={key}
          className={classes.cart__list__item}
          data-test="cartRow"
          data-test-id={line.variant.sku}
        >
          <Link href={productUrl}>
            <a>
              <Thumbnail
                className={classes.cart__list__item__img}
                source={line.variant.product ?? {}}
              />
            </a>
          </Link>
          <Box className={classes.cart__list__item__details}>
            <p data-test="price">
              <TaxedMoney taxedMoney={line.variant.pricing?.price} />
            </p>
            <Link href={productUrl}>
              <a>
                <p data-test="name">{line.variant.product?.name}</p>
              </a>
            </Link>
            <Box
              component="span"
              className={classes.cart__list__item__details__variant}
            >
              <Box component="span">{line.variant.name}</Box>
              <Box
                component="span"
                data-test="quantity"
              >
                <FormattedMessage
                  defaultMessage="Qty: {quantity}"
                  values={{ quantity: line.quantity }}
                />
              </Box>
            </Box>
            <IconButton
              style={{ marginTop: 4 }}
              size="small"
              onClick={() => remove(line.variant.id)}
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </Box>
        </li>
      );
    })}
  </ul>
);
export default ProductList;
