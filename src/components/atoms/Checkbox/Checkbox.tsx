import React from "react";
import { Box } from "@mui/material";

import * as S from "./styles";
import { IProps } from "./types";

const ENTER_KEY: number = 13;
const SPACE_KEY: number = 32;

export const Checkbox: React.FC<IProps> = ({ name, checked, onChange = () => null, children, ...props }: IProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <S.Checkbox
      ref={ref}
      onClick={(evt) => {
        evt.preventDefault();
        onChange(evt);
        if (ref.current) {
          ref.current.blur();
        }
      }}
    >
      <S.Label>
        <input
          {...props}
          tabIndex={-1}
          type="checkbox"
          name={name}
          checked={checked}
          readOnly
        />
        <div
          ref={ref}
          tabIndex={0}
          onKeyDown={(evt) => {
            if (evt.which === SPACE_KEY || evt.which === ENTER_KEY) {
              evt.preventDefault();
              onChange(evt);
            }
          }}
        >
          <Box component="span" />
        </div>
      </S.Label>
      {children}
    </S.Checkbox>
  );
};
