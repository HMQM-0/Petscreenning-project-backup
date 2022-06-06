import React, { useRef } from "react";
import { FormattedMessage } from "react-intl";

import { IconButton } from "components/molecules/IconButton";
import { AttributeValuesChecklist } from "components/molecules/AttributeValuesChecklist";
import { useHandlerWhenClickedOutside } from "@hooks";
import { commonMessages } from "deprecated/intl";
import { Overlay } from "components/atoms/Overlay";
import { ISingleFilterAttribute } from "@types";

import * as S from "./styles";
import { IProps } from "./types";


const checkIfAttributeIsChecked = (
  filters: IProps["filters"],
  value: ISingleFilterAttribute,
  slug: string
) => {
  if (filters!.attributes && filters.attributes.hasOwnProperty(slug)) {
    return filters.attributes[slug].some((filter) => filter === value.slug);
  }
  return false;
};

export const FilterSidebar = ({
  hide,
  filters,
  show,
  attributes,
  target,
  onAttributeFiltersChange,
}: IProps) => {
  const topEl = useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (show) {
      topEl.current?.scrollIntoView();
    }
  }, [show]);

  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    hide();
  });

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
                // TODO: values is [] (not undefined). BE issue
                values={values!.map((value) => ({
                  selected: checkIfAttributeIsChecked(filters, value, slug),
                  id: value.id,
                  name: value.name,
                  slug: value.slug,
                }))}
                valuesShowLimit
                onValueClick={(value) =>
                  onAttributeFiltersChange(slug, value.slug)
                }
              />
            );
          })}
      </S.Wrapper>
    </Overlay>
  );
};
