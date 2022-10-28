import { Box, Divider, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import * as React from "react";
import { useIntl } from "react-intl";

import { calculateTax } from "src/components/molecules/TaxedMoney/calculateTax";
import { commonMessages } from "src/core/intl";
import { ITaxedMoney } from "src/components/molecules/TaxedMoney/types";
import { TaxedMoney } from "src/components/molecules/TaxedMoney";
import { Money } from "src/components/atoms/Money";
import { ICheckoutModelPriceValue } from "src/components/providers/Nautical/Checkout/types";

interface ICartSummaryFooterProps {
  subtotal?: ITaxedMoney;
  promoCode?: ITaxedMoney;
  shipping?: ITaxedMoney;
  total?: ITaxedMoney;
  volumeDiscount?: ICheckoutModelPriceValue | undefined;
}

interface ICostLineProps {
  name: string;
  children?: React.ReactNode;
  volumeDiscount?: ICheckoutModelPriceValue | undefined;
  last?: boolean;
  negative?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  bigStyle: {
    fontSize: "1.125rem",
    fontWeight: 600,
    color: "#001A5D",
  },
  currencyStyle: {
    fontSize: "0.75rem !important",
    fontWeight: 400,
    marginRight: 8,
    alignSelf: "center",
  },
  numberStyle: {
    fontWeight: 600,
  },
  lastFont: {
    fontSize: "1rem !important",
    color: "#001A5D !important",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  otherFont: {
    fontSize: "0.875rem",
  },
  footerFlex: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 16,
    color: "#828282",
    fontSize: "14px",
  },
  Savings: {
    color: "#17A86B",
  },
}));

const CostLine = ({ name, children, last = false, negative = false }: ICostLineProps) => {
  const classes = useStyles({});

  return (
    <>
      {last ? <Divider /> : ""}
      <Box className={clsx(last ? classes.lastFont : classes.otherFont, classes.footerFlex, name.replace(/\s/g, "") )} data-name={`cartSummary${name.replace(/\s/g, "")}`}>
        <Box component="span">{name}</Box>
        <Box
          component="span"
          data-test={`cartSummaryCost${name.replace(/\s/g, "")}`}
          className={last ? classes.bigStyle : classes.numberStyle}
        >
          {negative && "- "}
          {children}
        </Box>
      </Box>
    </>
  );
};

const TaxedMoneyCostLine = ({
  taxedMoney,
  ...otherProps
}: Omit<ICostLineProps, "children"> & { taxedMoney: React.ComponentProps<typeof TaxedMoney>["taxedMoney"] }) => (
  <CostLine {...otherProps}>
    <TaxedMoney taxedMoney={taxedMoney} />
  </CostLine>
);

const MoneyCostLine = ({
  money,
  ...otherProps
}: Omit<ICostLineProps, "children"> & { money: React.ComponentProps<typeof Money>["money"] }) => (
  <CostLine {...otherProps}>
    <Money money={money} />
  </CostLine>
);

const CartSummaryFooter = ({ subtotal, promoCode, shipping, total, volumeDiscount }: ICartSummaryFooterProps) => {
  const intl = useIntl();

  return (
    <Box>
      {subtotal && (
        <MoneyCostLine
          name={intl.formatMessage(commonMessages.subtotal)}
          // Showing subtotal without taxes always (since taxes are shown separately below)
          money={subtotal.net}
        />
      )}
      {shipping && (
        <MoneyCostLine
          name={intl.formatMessage(commonMessages.shipping)}
          // Showing Shipping without taxes always (since taxes are shown separately below)
          money={shipping.net}
        />
      )}
      {promoCode && promoCode.gross.amount > 0 && (
        <TaxedMoneyCostLine
          name={intl.formatMessage(commonMessages.promoCode)}
          taxedMoney={promoCode}
          negative
        />
      )}      
      {total && (
        <MoneyCostLine
          name={intl.formatMessage({
            defaultMessage: "Taxes",
            description: "taxes",
          })}
          money={calculateTax(total)}
        />
      )}
      {volumeDiscount && volumeDiscount.amount > 0 && (
        <MoneyCostLine
          name={intl.formatMessage({
            defaultMessage: "Savings",
            description: "Savings",
          })}
          money={volumeDiscount}
          negative
        />
      )}
      {total && (
        <MoneyCostLine
          name={intl.formatMessage(commonMessages.total)}
          money={total.gross}
          last
        />
      )}
    </Box>
  );
};

export default CartSummaryFooter;
