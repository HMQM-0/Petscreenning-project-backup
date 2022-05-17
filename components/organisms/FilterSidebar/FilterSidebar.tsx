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
            // TODO: name can NOT be undefined. A BE issue. Adding `!` as a tmp fix
            a.name!.localeCompare(b.name!)
          )
          .map(({ id, name, slug, values }) => {
            return (
              <AttributeValuesChecklist
                key={id}
                title={name}
                // TODO: slug can NOT be undefined. A BE issue. Adding `!` as a tmp fix
                name={slug!}
                // TODO: values is [] (not undefined). BE issue
                values={values!.map((value) => ({
                  // TODO: value can not be null. A BE issue. Adding `!` as a tmp fix
                  // TODO: ISingleFilterAttribute is not compatible with value due to BE issues.
                  //  Adding `ts-ignore` as a tmp solution
                  // @ts-ignore
                  selected: checkIfAttributeIsChecked(filters, value!, slug),
                  // TODO: value can NOT be undefined. BE issue
                  id: value!.id,
                  // TODO: value.name can NOT be undefined. A BE issue. Adding `!` as a tmp fix
                  name: value!.name!,
                  // TODO: value.slug can NOT be undefined. A BE issue. Adding `!` as a tmp fix
                  slug: value!.slug!,
                }))}
                valuesShowLimit
                onValueClick={(value) =>
                  // TODO: slug can NOT be undefined. A BE issue. Adding `!` as a tmp fix
                  onAttributeFiltersChange(slug!, value.slug)
                }
              />
            );
          })}
      </S.Wrapper>
    </Overlay>
  );
};
