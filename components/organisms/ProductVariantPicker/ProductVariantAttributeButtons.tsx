import React from "react";

import { AttributeValue } from "@generated";

import * as S from "./styles";
import { AttributeOption } from "./ProductAttributePicker";

type CircleSelectorProps = {
  available: boolean;
  color: string | undefined | null;
  highlight: boolean;
  onClick(): void;
};

export const CircleSelector = ({ available, color, highlight, onClick }: CircleSelectorProps) => {
  return (
    <S.Wrap highlight={highlight}>
      <S.Swatch
        available={available}
        color={color || undefined}
        highlight={highlight}
        onClick={onClick}
      />
    </S.Wrap>
  );
};

type ProductVariantAttributeButtonsProps = {
  attributeOptions: AttributeOption[];
  selectedValue: AttributeValue["value"];
  onChangeSelection: (value: AttributeValue["value"]) => void;
  type: "Color" | "Size";
};

export const ProductVariantAttributeButtons = ({
  attributeOptions,
  selectedValue,
  onChangeSelection,
  type,
}: ProductVariantAttributeButtonsProps) => {
  return (
    <S.Flexwrap>
      <S.Label>{type}</S.Label>
      <S.Flexbox>
        {attributeOptions.map((attribute, index) => {
          if (type === "Color") {
            return (
              <CircleSelector
                available={!attribute.disabled}
                color={attribute.extra}
                highlight={selectedValue === attribute.value}
                key={index}
                onClick={() =>
                  onChangeSelection(attribute.value)
                }
              />
            );
          }

          return (
            <S.Button
              available={!attribute.disabled}
              highlight={selectedValue === attribute.value}
              key={index}
              onClick={() =>
                onChangeSelection(attribute.value)
              }
            >
              {attribute.label}
            </S.Button>
          );
        })}
      </S.Flexbox>
    </S.Flexwrap>
  );
};
