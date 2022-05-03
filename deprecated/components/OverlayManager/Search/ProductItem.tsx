import * as React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import { Thumbnail } from "@components/molecules/Thumbnail/Thumbnail";
import { generateProductUrl } from "core/utils";
import { IProps } from "deprecated/@next/components/molecules/Thumbnail/types";

interface ProductItemProps {
  node: {
    id: string;
    name: string;
    category?: {
      name: string;
    } | null;
  } & IProps["source"];
}

const ProductItem = ({
  node: product,
}: ProductItemProps) => (
  <li className="search__products__item">
    <Link to={generateProductUrl(product.id, product.name)}>
      <Thumbnail source={product} />
      <Box component="span">
        <h4>{product.name}</h4>
        <p>{product.category?.name || "-"}</p>
      </Box>
    </Link>
  </li>
);

export default ProductItem;
