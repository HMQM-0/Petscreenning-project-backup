import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { TextField } from "@mui/material";

import { Icon } from "components/atoms/Icon";
import { SelectSidebar } from "components/organisms/SelectSidebar";
import { AttributeValue } from "@generated";
import { VariantAttributeFragment } from "components/templates/ProductPage/queries.graphql.generated";

import * as S from "./styles";
import { AttributeOption } from "./ProductAttributePicker";

type ProductVariantAttributeSelectProps = {
  attribute: VariantAttributeFragment["attribute"];
  attributeOptions: AttributeOption[];
  selectedValue: AttributeValue["value"] | undefined;
  onChangeSelection: (value: AttributeValue["value"]) => void;
};

export const ProductVariantAttributeSelect = ({
  attribute,
  attributeOptions,
  selectedValue,
  onChangeSelection,
}: ProductVariantAttributeSelectProps) => {
  const [showSelectSidebar, setShowSelectSidebar] = React.useState(false);
  const intl = useIntl();

  const selectLabel = attribute.name;

  const selectedValuesList = selectedValue ? [selectedValue] : [];

  const handleSelectValueInSidebar = (optionValue: string) => {
    onChangeSelection(optionValue);
    setShowSelectSidebar(false);
  };

  const disabledOptions = useMemo(
    () => attributeOptions.filter(({ disabled }) => disabled).map(({ value }) => value),
    [attributeOptions],
  );

  return (
    <>
      <TextField
        onFocus={() => setShowSelectSidebar(true)}
        label={selectLabel}
        value={selectedValue || ""}
        onChange={() => null}
        InputProps={{
          endAdornment: (
            <S.SelectIndicator onClick={() => setShowSelectSidebar(true)}>
              <Icon
                name="subcategories"
                size={10}
              />
            </S.SelectIndicator>
          ),
        }}
        name={attribute.slug}
        data-test="variantPicker"
      />
      <SelectSidebar
        options={attributeOptions}
        selectedOptions={selectedValuesList}
        disabledOptions={disabledOptions}
        title={intl.formatMessage(
          {
            defaultMessage: "Please select {selectLabel}",
          },
          { selectLabel },
        )}
        show={showSelectSidebar}
        hide={() => setShowSelectSidebar(false)}
        onSelect={handleSelectValueInSidebar}
        testingContextId={attribute.slug}
      />
    </>
  );
};
