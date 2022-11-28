import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";
import { Divider } from "@mui/material";

import { generateCategoryUrl } from "src/core/utils";

import classes from "./index.module.scss";

// import "src/globalStyles/scss/index.scss";

interface IMenuOption {
  name: string;
  children: IMenuOption[];
  category: {
    id: string;
    name: string;
  };
  url?: string;
}
export interface IMenuListCompositionProps {
  option: IMenuOption;
  optionsPlacement: PopperPlacementType;
  isNavOption: boolean;
}

export default function MenuListComposition(props: IMenuListCompositionProps) {
  const { option, optionsPlacement, isNavOption } = props;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  // const prevOpen = useRef(open);
  // useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRef.current!.focus();
  //   }
  //
  //   prevOpen.current = open;
  // }, [open]);

  return (
    <Stack
      direction="row"
      spacing={2}
      onMouseEnter={handleToggle}
      onMouseLeave={handleToggle}
    >
      <Link
        href={
          option.category
            ? generateCategoryUrl(option.category.id, option.category.name)
            : new URL(option?.url || "/").pathname
        }
      >
        <Button
          className={isNavOption ? `${classes.menuOption} ${classes.navOption}` : classes.menuOption}
          data-cat-icon={option.name.toString().replaceAll(" ", "-")}
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          endIcon={option.children.length ? isNavOption ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon /> : null}
        >
          {option.name}
        </Button>
      </Link>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement={optionsPlacement}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
              zIndex: 5000,
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {option.children.map((children, index) => (
                    <div key={index}>
                      <MenuListComposition
                        option={children}
                        optionsPlacement="right-start"
                        isNavOption={false}
                      />
                      {index !== option.children.length - 1 && <Divider />}
                    </div>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
}
