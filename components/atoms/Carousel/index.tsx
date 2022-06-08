import NukaCarousel, { CarouselProps } from "nuka-carousel";
import * as React from "react";
import Media from "react-media";
import { IconButton, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import clsx from "clsx";

import carouselClasses from "./scss/index.module.scss";

interface CarouselType extends CarouselProps {
  children: React.ReactNode;
}

const Carousel = ({ children, ...rest }: CarouselType) => {
  const useStyles = makeStyles((theme: Theme) => ({
    buttonStyle: {
      backgroundColor: theme.palette?.secondary.main,
      placeItems: "center",
      position: "absolute",
      "&:hover": {
        backgroundColor: theme.palette?.primary.main,
      },
    },
    backStyle: {
      left: -20,
      top: -20,

      [theme.breakpoints?.down("sm")]: {
        left: -5,
      },
    },
    frontStyle: {
      left: -24,
      top: -20,

      [theme.breakpoints?.down("sm")]: {
        left: -42,
      },
    },
    iconStyle: {
      color: "white",
      display: "flex",
      paddingLeft: 4,
    },
  }));

  const classes = useStyles({});

  const carousel = (slides: number) => (
    // @ts-ignore
    <NukaCarousel
      className={carouselClasses.carousel}
      slidesToShow={slides}
      slidesToScroll={slides}
      heightMode="max"
      renderBottomCenterControls={() => null}
      renderCenterLeftControls={({ previousSlide, currentSlide }) =>
        currentSlide !== 0 ? (
          <IconButton
            onClick={previousSlide}
            className={clsx(classes.buttonStyle, classes.backStyle)}
            aria-label="Previous"
          >
            <ArrowForwardIosIcon
              className={classes.iconStyle}
              style={{ transform: "scaleX(-1)" }}
            />
          </IconButton>
        ) : null}
      renderCenterRightControls={({
        nextSlide,
        currentSlide,
        slideCount,
        slidesToShow,
      }) =>
        slideCount - slidesToShow !== currentSlide ? (
          <IconButton
            onClick={nextSlide}
            className={clsx(classes.buttonStyle, classes.frontStyle)}
            aria-label="Next"
          >
            <ArrowForwardIosIcon className={classes.iconStyle} />
          </IconButton>
        ) : null}
      {...rest}
    >
      {children}
    </NukaCarousel>
  );

  return (
    <Media query={{ maxWidth: 540 }}>
      {(matches) =>
        matches ? (
          carousel(1)
        ) : (
          <Media query={{ maxWidth: 992 }}>
            {(matches) => carousel(matches ? 2 : 4)}
          </Media>
        )
      }
    </Media>
  );
};

export default Carousel;
