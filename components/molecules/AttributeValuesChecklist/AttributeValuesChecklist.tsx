import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { ButtonLink } from "components/atoms/ButtonLink";
import { Checkbox } from "components/atoms/Checkbox";
import { DebouncedTextField } from "components/molecules/Debounce";
import { commonMessages } from "deprecated/intl";

import * as S from "./styles";
import { IProps } from "./types";


export const AttributeValuesChecklist = ({
  title,
  name,
  values,
  valuesShowLimit = false,
  valuesShowLimitNumber = 5,
  onValueClick,
}: IProps) => {
  const intl = useIntl();
  const [viewAllOptions, setViewAllOptions] = useState(!valuesShowLimit);

  const [valueSearch, setValueSearch] = useState("");

  const handleValueSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(event.target.value);
  };

  return (
    <S.Wrapper>
      {title && <S.Header>{title}</S.Header>}
      {values && values.length > valuesShowLimitNumber && (
        <DebouncedTextField
          onChange={(evt) => handleValueSearch(evt)}
          autoFocus
          style={{ textTransform: "capitalize", borderRadius: "8px" }}
          placeholder={intl.formatMessage(commonMessages.search)}
        />
      )}
      {values &&
      values.map((value, index) => {
        if (
          !value.name
            .toLocaleLowerCase()
            .includes(valueSearch.toLocaleLowerCase())
        ) {
          return (<></>);
        }
        if (!viewAllOptions && index > valuesShowLimitNumber - 1) {
          return (<></>);
        }
        return (
          <Checkbox
            name={name}
            checked={!!value.selected}
            onChange={() => onValueClick(value)}
            key={value.id}
          >
            {value && value.name}
          </Checkbox>
        );
      })}
      {!viewAllOptions && values.length > valuesShowLimitNumber && (
        <S.ViewMoreButton>
          <ButtonLink
            testingContext="viewAllButton"
            size="sm"
            color="secondary"
            onClick={() => setViewAllOptions(true)}
          >
            <FormattedMessage defaultMessage="VIEW ALL OPTIONS" />
          </ButtonLink>
        </S.ViewMoreButton>
      )}
      <S.BottomBorder />
    </S.Wrapper>
  );
};
