import React from "react";
import { Box } from "@mui/material";
import Link from "next/link";

import { BasicCategoryFragment } from "components/templates/CategoryPage/queries.graphql.generated";
import { generateCategoryUrl } from "core/utils";

import classes from "./scss/index.module.scss";

interface ICategoryBlockProps {
  category: Pick<BasicCategoryFragment, 'id' | 'name' | 'backgroundImage'>;
}

const CategoryBlock = ({ category }: ICategoryBlockProps) => (
  <Box key={category.id} className={classes["category-block-item"]}>
    <Link
      href={generateCategoryUrl(category.id, category.name)}
      key={category.id}
    >
      <a>
        <Box
          className={classes["category-block-image"]}
          style={{
            backgroundImage: `url(${
              category.backgroundImage
                ? category.backgroundImage.url
                // Using SVG copy from public folder until refactored
                : 'images/no-photo.svg'
            })`,
          }}
        >
          <Box className={classes["category-block-title"]}>{category.name}</Box>
        </Box>
      </a>
    </Link>
  </Box>
);

export default CategoryBlock;
