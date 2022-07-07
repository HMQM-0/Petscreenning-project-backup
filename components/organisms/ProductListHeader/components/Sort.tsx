import { StringParam, useQueryParams } from "next-query-params";
import React, { useCallback, useEffect } from "react";
import { IntlShape, useIntl } from "react-intl";

import { DropdownSelect } from "components/organisms/DropdownSelect";
import { prodListHeaderCommonMsg } from "core/intl";

import * as S from "../styles";

/**
 * Accepting `intl` as an optional prop,
 * since this method is also used in Builder.io components UI `enum`
 * where `intl` is not available
 */
export const getSortOptions = (intl?: IntlShape): { label: string; value: string | null }[] => [
  {
    label: intl
      ? intl.formatMessage(prodListHeaderCommonMsg.sortOptionsClear)
      : "Clear...",
    value: null,
  },
  {
    label: intl
      ? intl.formatMessage(prodListHeaderCommonMsg.sortOptionsCreatedAtDsc)
      : "Newest",
    value: "-created_at",
  },
  {
    label: intl
      ? intl.formatMessage(prodListHeaderCommonMsg.sortOptionsCreatedAt)
      : "Oldest",
    value: "created_at",
  },
  {
    label: intl
      ? intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPrice)
      : "Price Low-High",
    value: "price",
  },
  {
    label: intl
      ? intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPriceDsc)
      : "Price High-Low",
    value: "-price",
  },
  {
    label: intl
      ? intl.formatMessage(prodListHeaderCommonMsg.sortOptionsName)
      : "Name Increasing",
    value: "name",
  },
  {
    label: intl
      ? intl.formatMessage(prodListHeaderCommonMsg.sortOptionsNameDsc)
      : "Name Decreasing",
    value: "-name",
  },
  {
    label: intl
      ? intl.formatMessage(prodListHeaderCommonMsg.sortOptionsUpdatedAt)
      : prodListHeaderCommonMsg.sortOptionsUpdatedAt.defaultMessage,
    value: "Last updated Ascending",
  },
  {
    label: intl
      ? intl.formatMessage(prodListHeaderCommonMsg.sortOptionsUpdatedAtDsc)
      : "Last updated Descending",
    value: "-updated_at",
  },
];

interface SortProps {
  defaultSort?: string | undefined;
}

export const Sort = ({ defaultSort }: SortProps) => {
  const intl = useIntl();
  const [queryParams, setQueryParams] = useQueryParams({
    sortBy: StringParam,
    after: StringParam,
    before: StringParam,
  });

  const sortOptions = getSortOptions(intl);

  const { sortBy: sort } = queryParams;
  // TODO: sort is still undefined after `handleSortChange` in `useEffect` for some reason

  const handleSortChange = useCallback((value: any) => {
    setQueryParams({
      sortBy: value.value,
      after: null,
      before: null,
    });
  }, [setQueryParams]);

  useEffect(
    () => {
      if (typeof sort === 'undefined' && defaultSort) {
        handleSortChange({ value: defaultSort });
      }
    },
    [sort, defaultSort, handleSortChange]
  );

  return (
    <S.Sort>
      <DropdownSelect
        onChange={handleSortChange}
        options={sortOptions}
        value={sortOptions.find(
          (option) => option.value === sort
        )}
        isLastFormField={false}
      />
    </S.Sort>
  );
};
