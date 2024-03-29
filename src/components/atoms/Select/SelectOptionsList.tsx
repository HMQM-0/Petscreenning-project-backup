import clsx from "clsx";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import classes from "./scss/index.module.scss";
import { ISelectOptionsList } from "./customTypes";

type Ref = HTMLParagraphElement;

const renderNoOptions = () => (
  <p
    className={clsx(classes["select__option"], classes["select__option--disabled"])}
    key="no-option"
  >
    <FormattedMessage defaultMessage="No Options" />
  </p>
);

const getRef = (isSelected: boolean, ref: React.Ref<Ref>) => isSelected && { ref };

const SelectOptionsList = React.forwardRef<Ref, ISelectOptionsList>(
  ({ activeOption, options, onChange, setOpen, updateOptions }, ref) => (
    <>
      {options.length
        ? options.map(({ label, value }) => {
            const isSelected = activeOption.value === value;
            return (
              <p
                {...getRef(isSelected, ref)}
                className={clsx(classes["select__option"], {
                  [classes["select__option--selected"]]: isSelected,
                })}
                key={value}
                onClick={() => {
                  updateOptions({ label, value }, onChange);
                  setOpen(false);
                }}
              >
                {label}
              </p>
            );
          })
        : renderNoOptions()}
    </>
  ),
);

SelectOptionsList.displayName = "SelectOptionsList";

export default SelectOptionsList;
