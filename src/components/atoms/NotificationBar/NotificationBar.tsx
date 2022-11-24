import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Slider, { Settings as ReactSlickSettings } from "react-slick";

import slickClasses from "./scss/index.module.scss";

const useStyles = makeStyles(() => ({
  message: (props: { fontColor?: string; fontSize?: string }) => ({
    color: props?.fontColor || "#FFF",
    fontSize: props?.fontSize || "1rem",
    paddingBottom: 2,
    paddingTop: 0,
    textAlign: "center",
  }),
}));

export interface MessageProp {
  content: string;
  link?: string;
}

export interface NotificationProps {
  backgroundColor?: string;
  fontColor?: string;
  fontSize?: string;
  messages: MessageProp[];
  sliderSettings: ReactSlickSettings;
}

const NotificationBar = ({ backgroundColor, fontColor, fontSize, messages, sliderSettings }: NotificationProps) => {
  const classes = useStyles({ fontSize, fontColor });

  return (
    <Box
      className={slickClasses.wrapper}
      style={{
        backgroundColor: backgroundColor || "#000",
      }}
    >
      <Slider {...sliderSettings}>
        {messages.map(({ content, link }, index) => (
          <Box
            className={classes.message}
            key={index}
          >
            {link ? (
              <a
                style={{ padding: "0 15px", fontSize: "0.8em" }}
                target="_blank"
                href={link}
                rel="noreferrer"
              >
                {content}
              </a>
            ) : (
              <span>{content}</span>
            )}
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default NotificationBar;
