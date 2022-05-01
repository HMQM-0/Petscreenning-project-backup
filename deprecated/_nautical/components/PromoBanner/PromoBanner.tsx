import { AppBar } from "@mui/material";
import * as React from "react";
import { isEmpty } from "lodash";

import { usePromoBannerQuery } from "@generated";

import classes from "./scss/index.module.scss";

import { MessageProp, NotificationBar } from "../NotificationBar";

interface PromoBannerPromotionsData {
  display: string;
  id: string;
  link: string;
}

interface PromoBannerData {
  active: boolean;
  barColor: string;
  borderColor: string;
  promotions: PromoBannerPromotionsData[];
  speed: 5000;
  textColor: string;
}

interface IPromoBannerProps {
  content: string;
}

const PromoBanner = ({ content }: IPromoBannerProps) => {
  const { data, loading } = usePromoBannerQuery({
    variables: {
      name: "PromoBanner",
    },
  });

  type Data = typeof data;

  function resolvePromoBannerData(data: Data) {
    if (typeof data === "undefined") {
      return null;
    }
    const json = JSON.parse(data?.designerdata?.jsonContent);
    if (typeof json !== "undefined" || !isEmpty(json) || json !== null) {
      const _data: PromoBannerData = json;
      return _data;
    } else {
      return null;
    }
  }

  const promo = resolvePromoBannerData(data);

  type Promo = typeof promo;

  const hasMultiple = (promo?.promotions.length ?? 0) > 1;

  function mapPromotions(promo: Promo) {
    const messages: MessageProp[] =
      promo?.promotions.map((promotion) => ({
        content: promotion.display,
        link: promotion.link,
      })) ?? [];
    return messages;
  }

  return (
    <AppBar
      className={classes.promo_banner}
      position="static"
      style={{
        backgroundColor: loading ? "#000055" : promo?.barColor,
        color: loading ? "#fff" : promo?.textColor,
        borderColor: loading ? "#ccc" : promo?.borderColor,
      }}
    >
      {hasMultiple ? (
        <NotificationBar
          backgroundColor={promo?.barColor}
          fontColor={promo?.textColor}
          messages={mapPromotions(promo)}
          sliderSettings={{
            arrows: false,
            autoplay: true,
            autoplaySpeed: 5000,
            dots: false,
            infinite: true,
            slidesToScroll: 1,
            slidesToShow: 1,
            speed: 500,
          }}
        />
      ) : (
        <>
          {promo && promo.promotions.length > 0
            ? promo.promotions[0].display
            : content}
        </>
      )}
    </AppBar>
  );
};

export default PromoBanner;
