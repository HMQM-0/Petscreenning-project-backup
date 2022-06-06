import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Box, useTheme } from "@mui/material";
import { StringParam, useQueryParam } from "next-query-params";

import { DebounceChange } from "components/molecules/Debounce/DebounceChange";
import TextField from "components/atoms/TextField";

import classes from "./scss/index.module.scss";

const Search = () => {
  const intl = useIntl();
  const theme = useTheme();
  const [search, setSearch] = useQueryParam("q", StringParam);

  const backgroundStyle = {
    backgroundColor: theme.palette.secondary.main,
  };

  return (
    <Box className={classes["search-page"]}>
      <Box className={classes["search-page__header"]} style={backgroundStyle}>
        <Box className={`${classes["search-page__header__input"]} container`}>
          <DebounceChange<string>
            debounce={(evt) =>
              setSearch((evt.target.value as string).toLowerCase())
            }
            value={search || ""}
            time={1000}
          >
            {({ change, value }) => {
              return (
                <TextField
                  autoFocus
                  label={intl.formatMessage({
                    defaultMessage: "Search term:",
                  })}
                  labelColor={theme.palette.secondary.main}
                  onChange={change}
                  value={value}
                />
              );
            }}
          </DebounceChange>
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
