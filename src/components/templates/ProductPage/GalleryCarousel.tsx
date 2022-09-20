import * as React from "react";
import { Box } from "@mui/material";

import { CachedImage } from "src/components/molecules/CachedImage";
import { NoPhoto } from "src/components/icons/noPhoto";
import Carousel from "src/components/atoms/Carousel";

import classes from "./scss/index.module.scss";

type GalleryCarouselProps = {
  images: {
    id: string;
    url?: string;
    alt?: string;
  }[];
};

const GalleryCarousel = ({ images }: GalleryCarouselProps) => (
  <Box className={classes["product-page__product__gallery"]}>
    <Carousel
      renderCenterLeftControls={() => null}
      renderCenterRightControls={() => null}
      renderBottomCenterControls={(props) => {
        const indexes = [];

        for (let i = 0; i < props.slideCount; i++) {
          indexes.push(i);
        }

        return (
          <ul className={classes["product-page__product__gallery__nav"]}>
            {indexes.map((index) => (
              <li
                key={index}
                onClick={props.goToSlide.bind(null, index)}
                className={props.currentSlide === index ? classes.active : ""}
              >
                <span />
              </li>
            ))}
          </ul>
        );
      }}
    >
      {images.map((image) => (
        <CachedImage
          url={image.url}
          key={image.id}
        >
          <NoPhoto title={image.alt} />
        </CachedImage>
      ))}
    </Carousel>
  </Box>
);

export default GalleryCarousel;
