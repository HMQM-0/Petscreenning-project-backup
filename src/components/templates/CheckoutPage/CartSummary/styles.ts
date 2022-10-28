import { SxProps } from "@mui/material";

export const accordion: SxProps = {
  backgroundColor: "transparent",
  padding: 0,
};
export const accordionSummary: SxProps = {
  "& .MuiAccordionSummary-content": {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  marginBottom: 1,
  marginTop: 1,
  padding:"0 32px",
  ".MuiTypography-root": {
    margin:0
  },
};
export const checkoutWrapper: SxProps = {
  background: "linear-gradient(90deg, #FFF 50%, #F8FAFB 50%)",
  display: "flex",
  flexDirection: {
    xs: "row",
    sm: "column-reverse",
  },
  justifyContent: "center",
  height: "100%",
};
export const discountChip: SxProps = {
  marginBottom: "16px",
};
export const priceButton: SxProps = {
  borderRadius: 1,
  borderWidth: "0.5px !important",
  borderColor: "divider",
};
export const promoCodeContainer: SxProps = {
  display: "grid",
  gridTemplateColumns: "3fr 1fr",
  gap: 1,
  marginBottom: "16px",
  marginTop: "16px",
};
export const root: SxProps = {
  maxWidth: {
    xs: "100%",
    sm: "410px",
  },
  marginBottom: {
    xs: 0,
    sm: 2,
  },
  marginTop: {
    xs: 1,
    sm: 2,
  },
  paddingLeft: {
    xs: 0,
    sm: 0,
  },
  paddingRight: {
    xs: 0,
    sm: 0,
  },
};
export const title: SxProps = {
  marginBottom: {
    xs: 0,
    sm: 2,
  },
  fontSize: {
    xs: "1.1rem",
    sm: "initial",
  },
};

export const titleSummary: SxProps = {
  fontSize: "1.3rem",
  fontWeight: 700,
  textDecoration:"none",
  lineHeight:"1.2rem",
  color: "#001A5D",
  marginBottom:"30px"
};

export const orderSummary: SxProps = {
  padding:"32px",
  boxShadow:"0px 10px 5px -5px rgba(0, 0, 0, 0.05)"
};

export const cartProducts: SxProps = {
  padding:"50px 32px 32px",
};