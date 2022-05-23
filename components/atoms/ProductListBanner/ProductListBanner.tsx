import React from "react";
import { Box } from "@mui/material";

interface ProductListBannerProps {
  image: string;
}

const ProductListBanner = ({ image }: ProductListBannerProps) => {

  return (
    <Box>
      <img src={image} width="100%" />
    </Box>
  );
};

export default ProductListBanner;
