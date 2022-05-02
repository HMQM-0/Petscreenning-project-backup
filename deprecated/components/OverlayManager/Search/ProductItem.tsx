import * as React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import { Thumbnail } from "@components/molecules";
import { generateProductUrl } from "core/utils";
import {SearchResultsQuery} from "@generated";

const ProductItem = ({
  node: product,
}:
  // TODO: "edges" does not exist. How to get type?
  SearchResultsQuery["products"]["edges"]) => (
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
