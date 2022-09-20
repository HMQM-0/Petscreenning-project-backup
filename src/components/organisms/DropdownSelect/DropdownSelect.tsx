import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { components } from "react-select";
import { ThemeContext } from "styled-components";

import { useHandlerWhenClickedOutside } from "src/components/hooks";
import { Label } from "src/components/atoms/Label";
import { Select } from "src/components/molecules/Select";
import { Icon } from "src/components/atoms/Icon";

import { IProps } from "./types";
import * as S from "./styles";

export const DropdownSelect = ({ options, name, value, onChange, isLastFormField = true }: IProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setMenuIsOpen(false);
  });

  const customComponents = {
    Control: () => (
      <S.SortLine onClick={() => setMenuIsOpen(!menuIsOpen)}>
        <Label>
          <FormattedMessage defaultMessage="Sort by:" />{" "}
        </Label>
        <S.Value>{` ${value ? value.label : ""}`}</S.Value>
        <S.Indicator rotate={String(menuIsOpen)}>
          <Icon
            name="select_arrow"
            size={10}
          />
        </S.Indicator>
      </S.SortLine>
    ),
    IndicatorSeparator: () => null,
    IndicatorsContainer: () => null,
    Option: (props: any) => {
      const customTheme = React.useContext(ThemeContext);
      return <components.Option {...{ customTheme, ...props }} />;
    },
  };

  return (
    <S.Wrapper
      data-test="sortingDropdown"
      ref={setElementRef()}
    >
      <Select
        options={options}
        value={value}
        onChange={(value) => {
          setMenuIsOpen(false);
          onChange(value);
        }}
        name={name}
        menuIsOpen={menuIsOpen}
        customComponents={customComponents}
        isLastFormField={isLastFormField}
      />
    </S.Wrapper>
  );
};
