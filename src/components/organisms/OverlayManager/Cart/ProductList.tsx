import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Box, Button, IconButton } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Link from "next/link";
import router from "next/router";

import { TaxedMoney } from "src/components/molecules/TaxedMoney/TaxedMoney";
import { Thumbnail } from "src/components/molecules/Thumbnail/Thumbnail";
import { generateProductUrl } from "src/core/utils";
import { ICheckoutModelLine } from "src/components/providers/Nautical/Checkout/types";
import { commonMessages } from "src/core/intl";

import classes from "./scss/index.module.scss";

const imageBannerURL =
  "https://cdn.builder.io/api/v1/image/assets%2F77351f890251406eb2d564008d339e95%2Fa8749f1fe697490d8af39b552f0c9d1d";

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
            <Box className={classes.cart__list__item__details__price__container}>
              <Link href={productUrl}>
                <a className={classes.cart__list__item__details_product_name}>
                  <p data-test="name">{line.variant.product?.name}</p>
                  <Box
                    className={classes.cart__list__item__details__itemSKU}
                    component="span"
                  >
                    {line.variant.name}
                  </Box>
                </a>
              </Link>
              <p data-test="price">
                <TaxedMoney taxedMoney={line.variant.pricing?.price} />
              </p>
            </Box>
            <Box
              component="span"
              className={classes.cart__list__item__details__variant}
            >
              <Box
                className={classes.cart__list__item__details__itemSKU}
                component="span"
              >
                <FormattedMessage {...commonMessages.sku} />: <span data-test="itemSKU">{line.variant.sku || "-"}</span>
              </Box>
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
              className={classes.cart__list__item__details__deletebtn}
            >
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </Box>
        </li>
      );
    })}
    <Box className={classes["cart__banner"]}>
      <Box className={classes["cart__banner__text"]}>
        <p>Paw it Forward!</p>
        <p>buy a t-shirt for $25 and get your FidoAlert t-shirt</p>
        <p className={classes["cart__banner__text__info"]}>
          Since the beginning of FidoTabby, our loyal pet loving base has helped over 90,000 people keep their pets safe
          and FidoTabby Alert free to everyone
        </p>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.push(`/`)}
          className={classes["cart__banner__shopbtn"]}
        >
          <FormattedMessage defaultMessage="SHOP NOW" />
        </Button>
      </Box>
      <Box className={classes["cart__banner__image"]}>
        <img
          src={imageBannerURL}
          alt="T-shirt banner"
        />
      </Box>
    </Box>
  </ul>
);
export default ProductList;
