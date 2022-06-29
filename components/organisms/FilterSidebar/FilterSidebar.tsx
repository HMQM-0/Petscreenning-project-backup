import { useQueryParam, QueryParamConfig } from "next-query-params";
import React, { useRef } from "react";
import { FormattedMessage } from "react-intl";

import { IconButton } from "components/molecules/IconButton";
import { AttributeValuesChecklist } from "components/molecules/AttributeValuesChecklist";
import { useHandlerWhenClickedOutside } from "@hooks";
import { commonMessages } from "core/intl";
import { Overlay } from "components/atoms/Overlay";

import * as S from "./styles";
import { IProps } from "./types";

export interface QueryFilters {
  [key: string]: string[];
}

export const FilterQuerySet: QueryParamConfig<QueryFilters> = {
  encode(valueObj) {
    const str: string[] = [];
    Object.keys(valueObj).forEach((value) => {
      str.push(value + "_" + valueObj[value].join("_"));
    });
    return str.join(".");
  },

  decode(strValue) {
    const obj: Record<string, string[]> = {};
    if (typeof strValue !== "string") {
      return obj;
    }
    const propsWithValues = strValue?.split(".").filter((n) => n);
    propsWithValues?.map((value) => {
      const propWithValues = value.split("_").filter((n) => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
    });
    return obj;
  },
};

export const useQueryFilters = () => {
  const [attributeFilters, setAttributeFilters] = useQueryParam("filters", FilterQuerySet);

  const onQueryFilterChange = (attributeSlug: string, valueSlug: string, enable: boolean) => {
    const values = attributeFilters[attributeSlug]?.filter((value) => value !== valueSlug) ?? [];
    if (enable) {
      values.push(valueSlug);
    }
    setAttributeFilters({
      ...attributeFilters,
      [attributeSlug]: values,
    });
  };

  return {
    queryFilters: attributeFilters,
    setQueryFilters: setAttributeFilters,
    onQueryFilterChange,
  };
};

export const FilterSidebar = ({
  hide,
  show,
  attributes,
  target,
}: IProps) => {
  const topEl = useRef<HTMLElement>(null);
  const { queryFilters, onQueryFilterChange } = useQueryFilters();

  React.useEffect(() => {
    if (show) {
      topEl.current?.scrollIntoView();
    }
  }, [show]);

  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    hide();
  });

  const checkIfAttributeIsChecked = (
    attributeSlug: string,
    valueSlug: string
  ) => {
    if (queryFilters && queryFilters[attributeSlug]) {
      return queryFilters[attributeSlug].some((filter) => filter === valueSlug);
    }
    return false;
  };

  return (
    <Overlay
      duration={0}
      position="left"
      show={show}
      hide={hide}
      transparent
      target={target}
    >
      <S.Wrapper ref={setElementRef()} data-test="filterSidebar">
        <S.Header>
          <span ref={topEl}>
            <FormattedMessage {...commonMessages.filterHeader} />
          </span>
          <IconButton
            testingContext="hideFilters"
            onClick={hide}
            name="x"
            size={18}
            color="000"
          />
        </S.Header>
        {attributes
          .sort((a, b) =>
            a.name.localeCompare(b.name)
          )
          .map(({ id, name, slug, values }) => {
            return (
              <AttributeValuesChecklist
                key={id}
                title={name}
                name={slug}
                // values is [] (not undefined). BE issue
                values={values!.map((value) => ({
                  selected: checkIfAttributeIsChecked(slug, value.slug),
                  id: value.id,
                  name: value.name,
                  slug: value.slug,
                }))}
                valuesShowLimit
                onValueClick={(value) =>
                  onQueryFilterChange(slug, value.slug, !value.selected)
                }
              />
            );
          })}
      </S.Wrapper>
    </Overlay>
  );
};
