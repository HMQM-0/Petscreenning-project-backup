import { SxProps } from "@mui/material";

export const buttonPopover: SxProps = {
  borderRadius: "8px",
  minWidth: "180px",
  fontSize: "0.8rem",
  paddingBottom: 1,
  paddingTop: 1,
  minHeight: "43px",
  marginLeft: "0 !important",
};

export const breadcrumb: SxProps = {
  "& .MuiBreadcrumbs-ol": {
    justifyContent: "center",
  },
};

export const button: SxProps = {
  borderRadius: "50px",
  backgroundColor:"#0E6EFF",
  fontWeight: 700,
  fontSize: "15px",
  lineHeight: "1.1",
  "& .MuiButton-label": {
    fontSize: "1.0rem",
    fontWeight: 400,
  },
  "&:hover": {
    backgroundColor:"#0E6EFF",
  },
  marginBottom: {
    xs: 1,
    sm: 0,
  },
  padding:"15px 24px",
  minWidth: "365px",
};

export const buttonGroupButton: SxProps = {
  borderWidth: "1px important",
  borderColor: "divider",
  fontSize: "1rem",
};

export const buttonText: SxProps = {
  borderRadius: "2px",
  "& .MuiButton-label": {
    color: "text.disabled",
    fontSize: "1.0rem",
    fontWeight: 400,
    justifyContent: "start",
    marginLeft: "12px",
  },
};

export const cardButtonActive: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  height: "84px",
  width: "128px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "primary.main",
  color: `getContrastText(theme.palette.primary.main)`,
  fontSize: "0.9rem",
};

export const cardButton: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  height: "84px",
  width: "128px",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.9rem",
};
export const cardGroup: SxProps = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-around",
  flexFlow: "wrap",
  gap: "16px",
};
export const cartSummary: SxProps = {
  backgroundColor: "#F8FAFB",
  maxWidth: {
    xs: "100%",
    sm: "410px",
  },
  borderColor: "divider",
  padding: {
    xs: 0,
    sm: 4,
  },
  ".Savings": {
    color: "#17A86B",
    fontStyle:"italic",
  },
};

export const checkoutGrid: SxProps = {
  backgroundColor: "transparent",
  border: 1,
  borderColor: "divider",
  display: "grid",
  gridTemplateColumns: "1fr 40%",
  height: "100%",
};
export const fieldsGrid: SxProps = {
  display: {
    xs: "flex",
    sm: "grid",
  },
  flexDirection: {
    xs: "unset",
    sm: "column",
  },
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
  marginBottom: "16px",
};
export const buttonsGrid: SxProps = {
  display: {
    xs: "flex",
    sm: "grid",
  },
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
  flexDirection: "column-reverse",
  borderTop: 0,
  borderColor: "divider",
  pt: 2,
};
export const buttonsGridAddress: SxProps = {
  display: {
    xs: "flex",
    sm: "grid",
  },
  gridTemplateColumns: "auto",
  gap: "16px",
  flexDirection: "column-reverse",
  borderTop: 0,
  borderColor: "divider",
  pt: 2,
  justifyContent: {
    sm: "end"
  },
};
export const gridspan: SxProps = {
  gridColumn: "1 / span 2",
};
export const marginBottomDivider: SxProps = {
  marginBottom: "12px",
};
export const productShippingRow: SxProps = {
  display: "grid",
  marginTop: "16px",
  gridRowGap: "6px",
  gridColumnGap: "20px",
  gridTemplateColumns: "72px auto 50px",
  "& img": {
    maxHeight: "72px",
    maxWidth: "72px",
  },
};
export const quantityText: SxProps = {
  marginTop: "auto",
  marginBottom: "auto",
};
export const sellerName: SxProps = {
  fontSize: {
    xs: "1rem",
    sm: "1.3rem",
  },
  fontWeight: {
    xs: 600,
    sm: "700",
  },
  color: "#001A5D",
};
export const sellerShippingMethodSelect: SxProps = {
  display: "grid",
  gridTemplateColumns: "auto 200px",
  alignItems: "center",
  padding: "25px 0",
};
export const shippingCard: SxProps = {
  alignItems: "center",
  border: 1,
  borderColor: "divider",
  borderRadius: 8,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "8px 16px",
};
export const shippingMethodSelectMenuName: SxProps = {
  width: "100%",
};
export const shippingMethodSelectMenuOption: SxProps = {
  display: "inline-flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gridTemplateColumns: "1fr 1fr",
  gridColumnGap: "0.2fr",
  width: "100%",
  overflow: "hidden",
};
export const shippingMethodSelectMenuPrice: SxProps = {
  width: "100%",
  alignContent: "flex-end",
};
export const stackedText: SxProps = {
  display: "grid",
  marginTop: "auto",
  marginBottom: "auto",
  gridTemplateColumns: "auto",
};
export const tabs: SxProps = {
  borderBottom: "1px solid #ddd",
  marginBottom: "16px",
  "& .MuiTab-wrapper": {
    fontWeight: 600,
  },
};
export const textfield: SxProps = {
  marginTop: "8px",
  "& .MuiFormLabel-root": {
    left: "-12px",
    marginBottom: 0,
    textTransform: "capitalize",
    top: "-12px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    height: 56,
    top: 0,
    "& legend": {
      display: "none",
    },
  },
};
export const or: SxProps = {
  color: "#828282",
  fontSize: "1rem",
};

export const title: SxProps = {
  marginBottom: "30px",
  color: "#001A5D",
  fontSize: "1.3rem",
  fontWeight: 700,
};

export const account_login: SxProps = {
  fontSize: "1.3rem",
  fontWeight: 700,
  marginRight:"15px",
  lineHeight:"1.2rem",
  color: "#0E6EFF",  
  textDecoration:"none",
};

export const account_guest: SxProps = {
  fontSize: "1.3rem",
  fontWeight: 700,
  marginLeft:"15px",
  textDecoration:"none",
  lineHeight:"1.2rem",
};

export const singleTab: SxProps = {
  textTransform:"initial",
  fontWeight: 600,
  color:"#828282 !important",
};

export const returnCustomer: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: {
    sm: "right"
  },
  padding: 0,
  background: "transparent !important",
  color: "#828282",
  fontSize: "15px",
  textTransform: "initial",
};
export const paymentWrapper: SxProps = {
  marginBottom:"20px",
}