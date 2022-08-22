import { Box } from "@mui/material";
import React from "react";

import { wrapper, tile } from "./styles";
import { IProps } from "./types";

export const TileGrid: React.FC<IProps> = ({ elements, columns = 3 }: IProps) => {
  return (
    <Box sx={wrapper}>
      {elements.map((element: React.ReactNode, index) => (
        <Box key={index} sx={tile(columns)}>
          {element}
        </Box>
      ))}
    </Box>
  );
};
