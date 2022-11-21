import { Drawer, InputBase, IconButton, Paper } from "@mui/material";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent, KeyboardEvent } from "react";
import { createStyles, makeStyles } from "@mui/styles";

interface IMobileSearchDrawerProps {
  open: boolean;
  close(): void;
  handleKeyPress(event: KeyboardEvent<HTMLInputElement>): void;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  handleSearch(): void;
}

export const useStyles = makeStyles(() =>
  createStyles({
    search: {
      alignItems: "center",
      height: "100%",
    },
  }),
);

const MobileSearchDrawer: React.FunctionComponent<IMobileSearchDrawerProps> = (props) => {
  const { open, close, handleSearch, handleChange, handleKeyPress } = props;
  // const classes = useStyles();

  return (
    <Drawer
      anchor="top"
      open={open}
      hideBackdrop
      ModalProps={{
        onBackdropClick: close,
        style: {},
      }}
      PaperProps={{
        style: {
          height: "100%",
          position: "absolute",
          top: "89px",
        },
      }}
    >
      <Paper elevation={0}>
        <IconButton
          onClick={close}
          style={{
            marginLeft: "90vw",
            marginTop: "10px",
          }}
        >
          <CloseIcon />
        </IconButton>
        <div
          style={{
            border: "1px solid #858585",
            width: "353px",
            height: "49px",
            boxSizing: "border-box",
            display: "flex",
            margin: "10px 25px",
          }}
        >
          <InputBase
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search products"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            onClick={() => {
              handleSearch();
              close();
            }}
            aria-label="Search"
          >
            <SearchIcon htmlColor="#858585" />
          </IconButton>
        </div>
      </Paper>
    </Drawer>
  );
};

export default MobileSearchDrawer;
