import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";

import classes from "./index.module.scss";

const PawItForwardIcon = () => {
  const [anchorEl] = useState<(EventTarget & HTMLButtonElement) | (EventTarget & HTMLDivElement) | null>(null);
  const router = useRouter();

  const accountMenuOpen = Boolean(anchorEl);

  return (
    <IconButton
      aria-label="Paw It Forward"
      aria-controls={accountMenuOpen ? "account-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={accountMenuOpen ? "true" : undefined}
      onClick={() => router.push("https://store.fidotabby.com/product/pawitforward/1897/")}
    >
      <div className={`${classes.headerOption} ${classes.wide}`}>
        <PetsOutlinedIcon htmlColor="#21BC99" />
        <div className={classes.pawItForwardLabel}>Paw It Forward</div>
      </div>
    </IconButton>
  );
};

export default PawItForwardIcon;
