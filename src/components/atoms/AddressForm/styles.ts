import { SxProps } from "@mui/material";

export const textField: SxProps = {
  marginTop: {
    xs: 2,
    sm: 1,
  },
  "& .MuiFormLabel-root": {
    left: "-12px",
    marginBottom: 0,
    textTransform: "capitalize",
    top: "-10px",
    fontSize: "14px",
    color: "#828282",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    height: "56px",
    top: 0,
    "& legend": {
      display: "none",
    },
  },
};

export const gridSpan: SxProps = {
  gridColumn: "1 / span 2",
};
