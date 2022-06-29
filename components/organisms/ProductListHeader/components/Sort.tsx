import { StringParam, useQueryParams } from "next-query-params";
import React from "react";
import { useIntl } from "react-intl";

import { DropdownSelect } from "components/organisms/DropdownSelect";
import { prodListHeaderCommonMsg } from "core/intl";

import * as S from "../styles";

export const Sort = () => {
  const intl = useIntl();
  const [queryParams, setQueryParams] = useQueryParams({
    sortBy: StringParam,
    after: StringParam,
    before: StringParam,
  });

  const sortOptions = [
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsClear),
      value: null,
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPrice),
      value: "price",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPriceDsc),
      value: "-price",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsName),
      value: "name",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsNameDsc),
      value: "-name",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsUpdatedAt),
      value: "updated_at",
    },
    {
      label: intl.formatMessage(
        prodListHeaderCommonMsg.sortOptionsUpdatedAtDsc
      ),
      value: "-updated_at",
    },
  ];

  const { sortBy: sort } = queryParams;

  const handleSortChange = (value: any) => {
    setQueryParams({
      sortBy: value.value,
      after: null,
      before: null,
    });
  };

  return (
    <S.Sort>
      <DropdownSelect
        onChange={handleSortChange}
        options={sortOptions}
        value={sortOptions.find(
          (option) => option.value === sort
        )}
      />
    </S.Sort>
  );
};
