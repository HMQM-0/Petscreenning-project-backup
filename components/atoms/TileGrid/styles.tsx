import { SxProps } from "@mui/material";

export const wrapper: SxProps = {
  boxSizing: "border-box",
  display: "flex",
  flexWrap: "wrap",
  margin: 0,
  gap: "16px",
  height: {
    xs: "auto",
    sm: "100%",
  },
};

export const tile = (columns: number): SxProps => ({
  margin: 0,
  padding: 0,
  width: {
    xs: "100%",
    sm: `calc(calc(100% / ${columns}) - calc(16px / ${columns}))`,
  },
});
