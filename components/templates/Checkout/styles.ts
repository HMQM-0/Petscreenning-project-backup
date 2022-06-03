import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  backdropWhite: {
    backgroundColor: "#FFF",
    minWidth: 800,
    padding: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
      minWidth: "auto",
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  breadcrumb: {
    "& .MuiBreadcrumbs-ol": {
      justifyContent: "center",
    },
  },
  button: {
    borderRadius: 2,
    "& .MuiButton-label": {
      fontSize: "1.0rem",
      fontWeight: 400,
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: 84,
    },
  },
  buttonGroupButton: {
    borderWidth: "1px important",
    borderColor: `${theme.palette.divider}`,
    fontSize: "1rem",
  },
  buttonPopover: {
    borderRadius: 8,
    minWidth: 180,
    fontSize: "0.8rem",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    minHeight: 43,
    marginLeft: "0 !important",
  },
  buttonText: {
    borderRadius: 2,
    "& .MuiButton-label": {
      color: theme.palette.text.disabled,
      fontSize: "1.0rem",
      fontWeight: 400,
      justifyContent: "start",
      marginLeft: 12,
    },
  },
  cardButtonActive: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    height: 84,
    width: 128,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${theme.palette.primary.main}`,
    color: `${theme.palette.getContrastText(theme.palette.primary.main)}`,
    fontSize: "0.9rem",
  },
  cardButton: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    height: 84,
    width: 128,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
  },
  cardGroup: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    flexFlow: "wrap",
    gap: 16,
  },
  cartSummary: {
    backgroundColor: "#F8FAFB",
    borderLeft: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0),
      borderLeft: "none",
    },
  },
  checkoutBanner: {
    placeContent: "center",
    backgroundColor: "#FFF",
    display: "flex",
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: 96,
    width: "100vw",
  },
  checkoutWrapper: {
    background: "linear-gradient(90deg, #FFF 50%, #F8FAFB 50%)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  checkoutGrid: {
    // backgroundColor: 'transparent',
    // border: `1px solid ${theme.palette.divider}`,
    // display: 'grid',
    // gridTemplateColumns: '1fr 40%',
    // height: '100%',
  },
  fieldsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 16,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  buttonsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column-reverse",
    },
  },
  gridspan: {
    gridColumn: "1 / span 2",
  },
  marginBottomDivider: {
    marginBottom: "12px",
  },
  productShippingRow: {
    display: "grid",
    marginTop: "16px",
    gridRowGap: "6px",
    gridColumnGap: "20px",
    gridTemplateColumns: "72px auto 50px",
    "& img": {
      maxHeight: 72,
      maxWidth: 72,
    },
  },
  popoverActions: {
    justifyContent: "space-around",
    display: "flex",
    // flex-direction: column;
    gap: 4,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
  },
  quantityText: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  sellerName: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  sellerShippingMethodSelect: {
    display: "grid",
    gridTemplateColumns: "auto 200px",
  },
  shippingCard: {
    alignItems: "center",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "8px 16px",
  },
  shippingMethodSelectMenuName: {
    width: "100%",
  },
  shippingMethodSelectMenuOption: {
    display: "inline-flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // gridTemplateColumns: "1fr 1fr",
    // gridColumnGap: "0.2fr"
  },
  shippingMethodSelectMenuPrice: {
    width: "100%",
    alignContent: "flex-end",
  },
  stackedText: {
    display: "grid",
    marginTop: "auto",
    marginBottom: "auto",
    gridTemplateColumns: "auto",
  },
  tabs: {
    borderBottom: "1px solid #ddd",
    marginBottom: 16,
    "& .MuiTab-wrapper": {
      fontWeight: 600,
    },
  },
  textfield: {
    marginTop: 8,
    "& .MuiFormLabel-root": {
      left: -12,
      marginBottom: 0,
      textTransform: "uppercase",
      top: -8,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      height: 56,
      top: 0,
      "& legend": {
        display: "none",
      },
    },
  },
  title: {
    marginBottom: 16,
  },
}));
