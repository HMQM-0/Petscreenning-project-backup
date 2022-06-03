import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";

interface ProductListBannerProps {
  image: string;
}

const ProductListBanner = ({ image }: ProductListBannerProps) => {

  return (
    <Box>
      <Image src={image} width="100%" alt="product list banner" />
    </Box>
  );
};

export default ProductListBanner;
