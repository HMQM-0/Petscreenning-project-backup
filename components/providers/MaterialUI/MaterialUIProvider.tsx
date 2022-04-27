import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BrandingType } from "@generated";

type MaterialUIProviderProps = {
  children: React.ReactNode;
  branding?: BrandingType;
};

const MaterialUIProvider = ({
  children,
  branding,
}: MaterialUIProviderProps) => {
  const jsonContent = JSON.parse(branding?.jsonContent ?? "{}");
  const brandingActive = jsonContent.active;
  const primaryColor = brandingActive ? jsonContent.primaryColor : "#003563";
  const secondaryColor = brandingActive
    ? jsonContent.secondaryColor
    : "#B00631";

  const theme = {
    palette: {
      action: { active: "#703412" },
      primary: { main: primaryColor },
      secondary: { main: secondaryColor },
    },
    components: {
      MuiButton: {
        defaultProps: {},
        styleOverrides: {
          root: {
            borderRadius: 25,
            fontSize: "1.125rem",
            fontWeight: 700,
            padding: "12px 24px",
            "@media (max-width: 600px)": {
              fontSize: "1rem",
            },
          },
          outlined: {
            borderRadius: 25,
            borderWidth: "2px !important",
            padding: "8px 24px",
          },
        },
      },
    },
  };

  return <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>;
};

export { MaterialUIProvider };
