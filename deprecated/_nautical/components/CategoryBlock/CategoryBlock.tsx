// import classNames from "clsx";
import * as React from "react";
import { Box } from "@mui/material";
import Link from "next/link";

import noPhotoImg from "deprecated/images/no-photo.svg";
import { generateCategoryUrl } from "deprecated/core/utils";
import "./scss/index.module.scss";
import { ProductsList_categories_edges_node } from "deprecated/views/Home/gqlTypes/ProductsList";

interface ICategoryBlockProps {
  category: ProductsList_categories_edges_node;
}

const CategoryBlock: React.FC<ICategoryBlockProps> = (props) => {
  const { category } = props;
  return (
    <Box key={category.id} className="category-block-item">
      <Link
        href={generateCategoryUrl(category.id, category.name)}
        key={category.id}
      >
        <a>
          <Box
            className="category-block-image"
            style={{
              backgroundImage: `url(${
                category.backgroundImage
                  ? category.backgroundImage.url
                  : noPhotoImg
              })`,
            }}
          >
            <Box className="category-block-title">{category.name}</Box>
          </Box>
        </a>
      </Link>
    </Box>
  );
};

export default CategoryBlock;

/*

*/
