import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Link from "next/link";
import { Box, TextField } from "@mui/material";

import { calculateTax } from "components/molecules/TaxedMoney/calculateTax";
import { Money } from "components/atoms/Money";
import { useCart } from "nautical-api";
import { IconButton } from "components/molecules/IconButton";
import { CachedImage } from "components/molecules/CachedImage";
import { Icon } from "components/atoms/Icon";
import { commonMessages } from "core/intl";
import { generateProductUrl } from "core/utils";
import { ICheckoutModelLine } from "components/providers/Nautical/Checkout/types";

import * as S from "./styles";

interface CartRowProps {
  item: ICheckoutModelLine;
}

/**
 * Product row displayed on cart page
 */
export const CartRow = ({ item }: CartRowProps) => {
  const { removeItem, updateItem } = useCart();

  const { variant, quantity, totalPrice } = item;
  const id = variant?.product?.id || "";
  const name = variant?.product?.name || "";
  const maxQuantity = variant.quantityAvailable || quantity;
  const thumbnail = {
    ...variant?.product?.thumbnail,
    alt: variant?.product?.thumbnail?.alt || "",
  };

  const [tempQuantity, setTempQuantity] = useState<string>(quantity.toString());
  const intl = useIntl();

  const handleBlurQuantityInput = () => {
    let newQuantity = parseInt(tempQuantity, 10);

    if (isNaN(newQuantity) || newQuantity <= 0) {
      newQuantity = quantity;
    } else if (newQuantity > maxQuantity) {
      newQuantity = maxQuantity;
    }

    if (quantity !== newQuantity) {
      updateItem(variant.id, newQuantity);
    }

    const newTempQuantity = newQuantity.toString();
    if (tempQuantity !== newTempQuantity) {
      setTempQuantity(newTempQuantity);
    }
  };

  useEffect(() => {
    setTempQuantity(quantity.toString());
  }, [quantity]);

  const add = () => quantity < maxQuantity && updateItem(variant.id, quantity + 1);
  const subtract = () => quantity > 1 && updateItem(variant.id, quantity - 1);
  const handleQuantityChange = (evt: React.ChangeEvent<any>) => {
    setTempQuantity(evt.target.value);
  };

  const productUrl = generateProductUrl(id, name);

  return (
    <S.Wrapper
      data-test="cartRow"
      data-test-id={variant.sku}
    >
      <S.Photo>
        <Link href={productUrl}>
          <a>
            <CachedImage
              data-test="itemImage"
              {...thumbnail}
            />
          </a>
        </Link>
      </S.Photo>
      <S.Description>
        <Link href={productUrl}>
          <a>
            <S.Name data-test="itemName">{name}</S.Name>
          </a>
        </Link>
        <S.Sku>
          <S.LightFont>
            <FormattedMessage {...commonMessages.sku} />: <span data-test="itemSKU">{variant.sku || "-"}</span>
          </S.LightFont>
        </S.Sku>
        <S.Attributes data-test="itemAttributes">
          {variant.attributes?.map(({ attribute, values }, attributeIndex) => (
            <S.SingleAttribute key={attribute.id}>
              <span
                data-test="itemSingleAttribute"
                data-test-id={attributeIndex}
              >
                <S.LightFont>{attribute.name}:</S.LightFont> {values.map((value) => value?.name || "").join(", ")}
              </span>
            </S.SingleAttribute>
          ))}
        </S.Attributes>
      </S.Description>
      <S.Quantity>
        <TextField
          name="quantity"
          label={intl.formatMessage(commonMessages.qty)}
          value={tempQuantity}
          onBlur={handleBlurQuantityInput}
          onChange={handleQuantityChange}
          InputProps={{
            endAdornment: (
              <S.QuantityButtons data-test="quantityControls">
                <Box
                  mr={1}
                  onClick={subtract}
                  data-test="subtractButton"
                >
                  <Icon
                    size={16}
                    name="horizontal_line"
                  />
                </Box>
                <Box
                  ml={1}
                  onClick={add}
                  data-test="increaseButton"
                >
                  <Icon
                    size={16}
                    name="plus"
                  />
                </Box>
              </S.QuantityButtons>
            ),
          }}
        />
      </S.Quantity>
      <S.Trash>
        <IconButton
          testingContext="removeButton"
          size={22}
          name="trash"
          onClick={() => removeItem(variant.id)}
        />
      </S.Trash>

      <S.TotalPrice>
        <S.PriceLabel>
          <S.LightFont>
            <FormattedMessage {...commonMessages.totalPrice} />:
          </S.LightFont>
        </S.PriceLabel>
        <p data-test="totalPrice">
          <Money money={totalPrice?.net} />
        </p>
      </S.TotalPrice>
      <S.UnitPrice>
        <S.PriceLabel>
          <S.LightFont>
            <FormattedMessage {...commonMessages.price} />:
          </S.LightFont>
        </S.PriceLabel>
        <p data-test="unitPrice">
          <Money money={variant?.pricing?.price?.net} />
        </p>
      </S.UnitPrice>
      <S.TaxPrice>
        <S.PriceLabel>
          <S.LightFont>
            <FormattedMessage
              defaultMessage="Taxes"
              description="taxes"
            />
            :
          </S.LightFont>
        </S.PriceLabel>
        <p>
          <Money money={calculateTax(totalPrice)} />
        </p>
      </S.TaxPrice>
    </S.Wrapper>
  );
};
