import { Box, Card, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import isEqual from "lodash/isEqual";

import { IImage } from "src/types";
import { commonMessages } from "src/core/intl";
import { CachedImage } from "src/components/molecules/CachedImage";
import { ITaxedMoney } from "src/components/molecules/TaxedMoney/types";
import { TaxedMoney } from "src/components/molecules/TaxedMoney";

interface ICartSummaryRowProps {
  index?: number;
  name: string;
  variant?: string;
  sku: string;
  quantity: number;
  price: ITaxedMoney;
  priceUndiscounted?: ITaxedMoney;
  thumbnail?: IImage;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    gap: 16,
    // gridTemplateColumns: '72px 1fr 25%',
    marginBottom: 8,
    marginTop: 8,
    "&:first-child": {
      marginTop: 16,
    },
    "&:last-child": {
      marginBottom: 16,
    },
  },
  card: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    flexShrink: 0,
    padding: 6,
    width: 84,
    height: 84,
    border: 0,
    background: "transparent",
    "& img": {
      maxHeight: 72,
      maxWidth: 72,
    },
  },
  title: {
    fontSize: "0.875rem",
    color: "#001A5D",
    fontWeight: "700"
  },
  caption: {
    // color: theme.palette.grey[600],
    fontSize: "0.750rem",
    fontWeight: "lighter",
    color:"#828282",
  },
  cost: {
    // color: theme.palette.grey[800],
    fontSize: "1.125rem",
    textAlign: "right",
    marginLeft: "auto",
    color: "#001A5D",
    fontWeight: "700"
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const CartSummaryRow: React.FunctionComponent<ICartSummaryRowProps> = (props) => {
  const { sku, name, variant, price, priceUndiscounted, quantity, thumbnail } = props;
  const classes = useStyles(props);
  return (
    <Box
      key={sku}
      className={classes.root}
    >
      <Card
        elevation={0}
        variant="outlined"
        square
        className={classes.card}
      >
        <CachedImage
          data-test="image"
          {...thumbnail}
        />
      </Card>
      <Box className={classes.info}>
        <Box>
          <Typography className={classes.title}>{name}</Typography>
          <Typography className={classes.caption}>
            <Box component="span">{variant}</Box>
          </Typography>
        </Box>
        <Box className={classes.caption}>
          <FormattedMessage {...commonMessages.quantity} />
          {": "}
          <Box
            component="span"
            data-test="quantity"
          >
            {quantity}
          </Box>
        </Box>
      </Box>
      <Typography className={classes.cost}>
        {isEqual(price, priceUndiscounted) ? (
          <TaxedMoney taxedMoney={price} />
        ) : (
          <>
            <Typography style={{ textDecoration: "line-through" }}>
              <TaxedMoney taxedMoney={priceUndiscounted} />
            </Typography>
            <TaxedMoney taxedMoney={price} />
          </>
        )}
      </Typography>
    </Box>
  );
};

export default CartSummaryRow;
