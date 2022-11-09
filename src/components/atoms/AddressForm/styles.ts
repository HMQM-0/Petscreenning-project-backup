import { SxProps } from "@mui/material";

export const textField: SxProps = {
  marginTop: {
    xs: 2,
    sm: 1,
  },
  "& .MuiFormLabel-root": {
    left: "-12px",
    marginBottom: 0,
    textTransform: "uppercase",
    top: "-8px",
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
