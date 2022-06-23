import { AppBar } from "@mui/material";
import * as React from "react";

import { NotificationBar } from "components/atoms/NotificationBar";

import classes from "./scss/index.module.scss";
import { usePromoBannerQuery } from "./queries.graphql.generated";

interface PromoBannerPromotionsData {
  display: string;
  id: string;
  link: string;
}

interface PromoBannerData {
  active: boolean;
  barColor?: string;
  borderColor?: string;
  promotions: PromoBannerPromotionsData[];
  speed: number;
  textColor?: string;
}

export const PromoBanner = () => {
  const { data, loading } = usePromoBannerQuery({
    variables: {
      name: "PromoBanner",
    },
  });

  const json: Record<string, string> | undefined =
    data && JSON.parse(data?.designerdata?.jsonContent);

  const promo: PromoBannerData = {
    ...(json || {}),
    // Convert `active` to boolean
    active: Boolean(json?.active),
    // Assuming that if promotions is an array, then it contains proper array items
    promotions: Array.isArray(json?.promotions)
      ? (json!.promotions as PromoBannerPromotionsData[])
      : [],
    // Speed is hardcoded to 5 sec on Dashboard side for now
    speed: 5000,
  };

  if (!promo.active || !promo.promotions.length) {
    return null;
  }

  return (
    <AppBar
      className={classes.promo_banner}
      position="static"
      style={{
        backgroundColor: loading ? "#000055" : promo.barColor,
        color: loading ? "#fff" : promo.textColor,
        borderColor: loading ? "#ccc" : promo.borderColor,
      }}
    >
      <NotificationBar
        backgroundColor={promo.barColor}
        fontColor={promo.textColor}
        messages={promo.promotions.map(({ display, link }) => ({
          content: display,
          link,
        }))}
        sliderSettings={{
          arrows: false,
          autoplay: true,
          autoplaySpeed: promo.speed,
          dots: false,
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 1,
          speed: 500,
        }}
      />
    </AppBar>
  );
};
