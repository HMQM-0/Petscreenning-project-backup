import classNames from "clsx";
import * as React from "react";
import Link from "next/link";
import { Box } from "@mui/material";

import { calculateTax } from "src/components/molecules/TaxedMoney/calculateTax";
import { Money } from "src/components/atoms/Money";
import {
  NauticalOrderDetailFragment,
  ProductVariantFragment,
} from "src/components/providers/Nautical/Checkout/fragments.graphql.generated";
import { Thumbnail } from "src/components/molecules/Thumbnail";
import { generateProductUrl } from "src/core/utils";
import { TaxedMoney, IProps as TaxedMoneyProps } from "src/components/molecules/TaxedMoney";

import classes from "./scss/index.module.scss";

export type ILine = {
  variant?: {
    product: ProductVariantFragment["product"];
    pricing?: {
      price?: TaxedMoneyProps["taxedMoney"] | null;
    } | null;
    attributes: ProductVariantFragment["attributes"];
  } | null;
  quantity: number;
  totalPrice?: NauticalOrderDetailFragment["lines"][number]["totalPrice"] | null;
  quantityAvailable?: number;
};

interface ReadProductRowProps {
  mediumScreen: boolean;
  line: ILine;
}

export interface EditableProductRowProps {
  processing?: boolean;
}

const ProductRow: React.FC<ReadProductRowProps & EditableProductRowProps> = ({ mediumScreen, processing, line }) => {
  const variant = line.variant;
  const product = variant?.product;
  const productUrl = (product && generateProductUrl(product.id, product.name)) || "";

  return (
    <tr
      className={classNames({
        [classes["cart-table-row--processing"]]: processing,
      })}
    >
      <td className={classes["cart-table__thumbnail"]}>
        <Box>
          {mediumScreen && <Link href={productUrl}>{product && <Thumbnail source={product} />}</Link>}
          <Link href={productUrl}>{product?.name}</Link>
        </Box>
      </td>

      {mediumScreen && (
        <td>
          <TaxedMoney taxedMoney={variant?.pricing?.price} />
        </td>
      )}

      <td>
        {variant?.attributes.map(({ attribute, values }, attributeIndex) => (
          <p key={attribute.id}>
            {attribute.name}: {values.map((value) => value?.name).join(", ")}
          </p>
        ))}
      </td>

      <td className={classes["cart-table__quantity-cell"]}>
        <p>{line.quantity}</p>
      </td>

      {mediumScreen && (
        <td>
          <Money money={calculateTax(line.totalPrice)} />
        </td>
      )}

      <td colSpan={2}>
        <Money money={line.totalPrice?.gross} />
      </td>
    </tr>
  );
};

export default ProductRow;
