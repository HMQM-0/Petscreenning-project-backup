import * as React from "react";
import { ReactSVG } from "react-svg";
import { Box } from "@mui/material";

import nauticalProp from "deprecated/images/nautical-prop.svg";

import classes from "./scss/index.module.scss";

const Loader: React.FC<{ full?: boolean }> = ({ full }) => {
  const getHeight = () => {
    const headerHeight = document.getElementById("header")?.offsetHeight ?? 0;
    const footerHeight = document.getElementById("footer")?.offsetHeight ?? 0;
    return window.innerHeight - headerHeight - footerHeight;
  };

  return (
    <Box className={classes.loader} style={full ? { height: getHeight() } : {}}>
      <ReactSVG src={nauticalProp} className={`${classes.loader}__item`} />
    </Box>
  );
};

export default Loader;
