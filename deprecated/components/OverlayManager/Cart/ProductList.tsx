// import { ICheckoutModelLine } from "@nautical/sdk/lib/helpers";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { TaxedMoney } from "deprecated/@next/components/containers";
import { Thumbnail } from "deprecated/@next/components/molecules";
import { ICheckoutModelLine } from "@nautical/helpers";
import {
  generateMicrositeProductUrl,
  generateProductUrl,
  getMicrositeId,
  isMicrosite,
  getMicrositeSlug,
} from "core/utils";
// import removeImg from "../../../images/garbage.svg";

type ProductListProps = {
  lines: ICheckoutModelLine[];
  remove(variantId: string): void;
};

const ProductList = ({ lines, remove }: ProductListProps) => (
  <ul className="cart__list">
    {lines.map((line, index) => {
      const productUrl = !!isMicrosite()
        ? generateMicrositeProductUrl(
            line.variant.product?.id ?? "",
            line.variant.product?.name ?? "",
            getMicrositeId(),
            getMicrositeSlug()
          )
        : generateProductUrl(
            line.variant.product?.id ?? "",
            line.variant.product?.name ?? ""
          );
      const key = line.id ? `id-${line.id}` : `idx-${index}`;

      return (
        <li
          key={key}
          className="cart__list__item"
          data-test="cartRow"
          data-test-id={line.variant.sku}
        >
          <Link to={productUrl}>
            <Thumbnail source={line.variant.product ?? {}} />
          </Link>
          <Box className="cart__list__item__details">
            <p data-test="price">
              <TaxedMoney taxedMoney={line.variant.pricing?.price} />
            </p>
            <Link to={productUrl}>
              <p data-test="name">{line.variant.product?.name}</p>
            </Link>
            <Box
              component="span"
              className="cart__list__item__details__variant"
            >
              <Box component="span">{line.variant.name}</Box>
              <Box component="span" data-test="quantity">
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
