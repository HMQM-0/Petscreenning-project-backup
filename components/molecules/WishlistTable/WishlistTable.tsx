import React from "react";
import { Box } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import Link from "next/link";

import { Heart } from "components/icons/heart";
import { useAuth } from "nautical-api";
import {
  generateMicrositeUrl,
  getMicrositeId,
  getMicrositeSlug,
  isMicrosite,
} from "core/utils";
import {
  OverlayContext,
  OverlayType,
  OverlayTheme,
} from "components/providers/Overlay/context";
import WishlistCard from "components/molecules/WishlistCard";

import { IProps } from "./types";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
    },
    title: {
      paddingLeft: "16px",
      paddingTop: "16px",
      marginBottom: "32px",
      fontWeight: 700,
    },
    emptyContainer: {
      display: "flex",
      flex: "1 1 0%",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: "3rem",
      paddingRight: "3rem",
      paddingTop: "6rem",
      paddingBottom: "6rem",
      alignItems: "center",
    },
    heartWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "4rem",
      height: "4rem",
      padding: "3rem",
      borderRadius: "0.5rem",
      border: "1px dashed black",
    },
    heartIcon: {
      position: "absolute",
    },
    emptyMessage: {
      paddingTop: "1.5rem",
      fontSize: "1.5rem",
      lineHeight: "2rem",
      fontWeight: 700,
      letterSpacing: "0.025em",
      textAlign: "center",
    },
    clickMessage: {
      paddingLeft: "2.5rem",
      paddingRight: "2.5rem",
      textAlign: "center",
      paddingTop: "0.5rem",
      color: "blue",
      cursor: "pointer",
    },
  })
);

export const WishlistTable = ({ wishlist }: IProps) => {
  const classes = useStyles();
  const { user } = useAuth();
  return (
    <OverlayContext.Consumer>
      {(overlayContext) => (
        <Box className={classes.container}>
          <h3 className={classes.title}>My Wishlist</h3>
          {wishlist?.map((item) => (
            <WishlistCard key={item.id} item={item} />
          ))}
          {(!wishlist || wishlist.length === 0) && (
            <Box className={classes.emptyContainer}>
              <Box component="span" className={classes.heartWrapper}>
                <Heart className={classes.heartIcon} />
              </Box>
              <h2 className={classes.emptyMessage}>Your wishlist is empty</h2>
              {user ? (
                <Link
                  href={
                    isMicrosite()
                      ? generateMicrositeUrl(
                          getMicrositeId()!,
                          getMicrositeSlug()
                        )
                      : "/products/"
                  }
                  passHref
                >
                  <a>
                    <p className={classes.clickMessage}>
                      Browse to start adding products to your wishlist
                    </p>
                  </a>
                </Link>
              ) : (
                <p
                  className={classes.clickMessage}
                  onClick={() =>
                    overlayContext.show(OverlayType.login, OverlayTheme.right)
                  }
                >
                  <a>Sign in to start adding products to your wishlist</a>
                </p>
              )}
            </Box>
          )}
        </Box>
      )}
    </OverlayContext.Consumer>
  );
};
