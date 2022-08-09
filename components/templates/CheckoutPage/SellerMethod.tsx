import React from "react";
import { Box, Divider, MenuItem, Typography } from "@mui/material";
import { Field } from "formik";
import { TextField } from "formik-mui";
import { useIntl } from "react-intl";

import { Money } from "components/atoms/Money";
import { CachedImage } from "components/molecules/CachedImage";
import {
  ICheckoutModelLine,
  IMultiSellerAvailableShippingMethods_mapping,
} from "components/providers/Nautical/Checkout/types";
import { checkoutMessages } from "core/intl";

import { useStyles } from "./styles";
import { useSellerNameQuery } from "./queries.graphql.generated";

type SellerMethodProps = {
  sellerMethod: IMultiSellerAvailableShippingMethods_mapping;
  handleSetSellerShippingMethods: (seller: number, shippingMethodSelection: string) => Promise<void>;
  mappingDict: Record<string, ICheckoutModelLine[]>;
};

const SellerMethod = ({ sellerMethod, handleSetSellerShippingMethods, mappingDict }: SellerMethodProps) => {
  const intl = useIntl();
  const { data } = useSellerNameQuery({
    variables: { id: String(sellerMethod.seller) },
  });
  const classes = useStyles({});

  return (
    <Box>
      <Box mb={2}>
        <Box className={classes.sellerShippingMethodSelect}>
          <Typography variant="h4" className={classes.sellerName}>
            {data?.sellerName?.companyName}
          </Typography>
          <Field
            className={classes.textfield}
            component={TextField}
            name={"shippingMethod" + String(sellerMethod.seller)}
            label={intl.formatMessage(checkoutMessages.shippingMethod)}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            select
            required
            disabled={!sellerMethod.value.length}
            helperText={!sellerMethod.value.length && "No available shipping methods. Please contact support."}
          >
            {sellerMethod.value.map((option) => (
              <MenuItem
                key={option.name}
                value={option.id}
                onClick={(event) => handleSetSellerShippingMethods(sellerMethod.seller, option.id)}
              >
                <Box className={classes.shippingMethodSelectMenuOption}>
                  <Box className={classes.shippingMethodSelectMenuName}>
                    <Typography>{option.name}&nbsp;|&nbsp;</Typography>
                  </Box>
                  <Box className={classes.shippingMethodSelectMenuPrice}>
                    <Money money={option.price} />
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </Field>
        </Box>
        {mappingDict[sellerMethod.seller]?.map((sellerMapping) => (
          <Box key={sellerMapping.id} className={classes.productShippingRow}>
            {/* @ts-ignore TODO: Checkout_lines_variant_product_thumbnail canot be null */}
            <CachedImage {...sellerMapping.variant?.product?.thumbnail} />
            <Box className={classes.stackedText}>
              <Typography>{sellerMapping.variant?.product?.name}</Typography>
              <Typography variant="caption">{sellerMapping.variant?.name}</Typography>
            </Box>
            <Typography className={classes.quantityText}>{"Qty: " + sellerMapping.quantity}</Typography>
          </Box>
        ))}
      </Box>
      <Divider className={classes.marginBottomDivider} />
    </Box>
  );
};

export { SellerMethod };
