import React from "react";
import { Box, Divider, MenuItem, Typography } from "@mui/material";
import { Field, Formik } from "formik";
import { TextField } from "formik-mui";
import { useIntl } from "react-intl";

import { Money } from "src/components/atoms/Money";
import { CachedImage } from "src/components/molecules/CachedImage";
import { ICheckoutModelLine } from "src/components/providers/Nautical/Checkout/types";
import { checkoutMessages } from "src/core/intl";
import { MultiSellerShippingMethodFragment } from "src/components/providers/Nautical/Checkout/fragments.graphql.generated";

import { useSellerNameQuery } from "./queries.graphql.generated";
import {
  marginBottomDivider,
  productShippingRow,
  quantityText,
  sellerName,
  sellerShippingMethodSelect,
  shippingMethodSelectMenuName,
  shippingMethodSelectMenuOption,
  shippingMethodSelectMenuPrice,
  stackedText,
  textfield,
} from "./styles";

type SellerMethodProps = {
  sellerMethod: MultiSellerShippingMethodFragment;
  handleSetSellerShippingMethods: (seller: number, shippingMethodSelection: string) => Promise<void>;
  mappingDict: Record<string, ICheckoutModelLine[]>;
  shippingMethod: string;
};

const SellerMethod = ({
  sellerMethod,
  handleSetSellerShippingMethods,
  mappingDict,
  shippingMethod,
}: SellerMethodProps) => {
  const intl = useIntl();
  const { data } = useSellerNameQuery({
    variables: { id: String(sellerMethod.seller) },
  });
  return (
    <Box>
      <Box mb={2}>
        <Box sx={sellerShippingMethodSelect}>
          <Typography
            variant="h4"
            sx={sellerName}
          >
            {data?.sellerName?.companyName}
          </Typography>
          <Formik
            initialValues={{
              [`shippingMethod${sellerMethod.seller}`]: shippingMethod,
            }}
            onSubmit={() => {}}
          >
            {({ errors, touched, isSubmitting }) => (
              <Field
                sx={textfield}
                component={TextField}
                name={`shippingMethod${sellerMethod.seller}`}
                label={intl.formatMessage(checkoutMessages.shippingMethod)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                select
                required
                disabled={!sellerMethod?.value?.length}
                helperText={!sellerMethod?.value?.length && "No available shipping methods. Please contact support."}
              >
                {sellerMethod?.value?.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                    onClick={(event) => handleSetSellerShippingMethods(Number(sellerMethod.seller), option.id)}
                  >
                    <Box sx={shippingMethodSelectMenuOption}>
                      <Box sx={shippingMethodSelectMenuName}>
                        <Typography>{option.name}&nbsp;|&nbsp;</Typography>
                      </Box>
                      <Box sx={shippingMethodSelectMenuPrice}>
                        <Money money={option.price} />
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Field>
            )}
          </Formik>
        </Box>
        {mappingDict[Number(sellerMethod.seller)]?.map((sellerMapping) => (
          <Box
            key={sellerMapping.id}
            sx={productShippingRow}
          >
            {/* @ts-ignore TODO: Checkout_lines_variant_product_thumbnail canot be null */}
            <CachedImage {...sellerMapping.variant?.product?.thumbnail} />
            <Box sx={stackedText}>
              <Typography>{sellerMapping.variant?.product?.name}</Typography>
              <Typography variant="caption">{sellerMapping.variant?.name}</Typography>
            </Box>
            <Typography sx={quantityText}>{"Qty: " + sellerMapping.quantity}</Typography>
          </Box>
        ))}
      </Box>
      <Divider sx={marginBottomDivider} />
    </Box>
  );
};

export { SellerMethod };
