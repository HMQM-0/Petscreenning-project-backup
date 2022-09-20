/* eslint-disable jsx-a11y/label-has-associated-control */

import { Box } from "@mui/material";
import clsx from "clsx";
import { filter, find } from "lodash";
import * as React from "react";

import { useClickedOutside } from "src/components/hooks";

import classes from "./scss/index.module.scss";
import { IFilteredListArgs, ISelectChange, ISelectItem, ISelectProps } from "./customTypes";
import SelectOptionsList from "./SelectOptionsList";

const updateOptions = ({ label, value }: ISelectItem, onChange: ISelectChange) =>
  onChange({ country: label, code: value });

const filterList = ({ searchPhrase, options }: IFilteredListArgs) =>
  filter(options, ({ label }) => label.toLowerCase().includes(searchPhrase.toLowerCase()));

const isAutofilled = (inputValue: string, newInputValue: string) =>
  newInputValue.length > 1 && newInputValue.substring(0, newInputValue.length - 1) !== inputValue;

const findAutofilledOption = (options: ISelectItem[], inputValue: string) =>
  find(options, ({ label }) => label.toLowerCase() === inputValue.toLowerCase());

export const Select = (props: ISelectProps) => {
  const { autoComplete, defaultValue = { label: "", value: "" }, label, onChange, options, name } = props;
  const [open, setOpen] = React.useState(false);
  const [searchPhrase, setSearchPhrase] = React.useState(defaultValue.label);
  const { clickedOutside, setElementRef } = useClickedOutside();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const activeOptionRef = React.useRef<HTMLParagraphElement>(null);

  const resetInputValueToDefault = () => setSearchPhrase(defaultValue.label);

  React.useEffect(() => {
    resetInputValueToDefault();
  }, [clickedOutside, defaultValue]);

  React.useEffect(() => {
    if (activeOptionRef.current && open) {
      activeOptionRef.current.scrollIntoView();
      activeOptionRef.current.focus();
    }
  }, [open]);

  const shouldOpen = clickedOutside ? false : open;
  const shouldSearch = defaultValue.label !== searchPhrase;

  const renderLabel = (label?: string) => label && <label className={classes["input__label"]}>{label}</label>;

  const changeSelectionRange = (e: React.ChangeEvent<any>) =>
    inputRef.current?.setSelectionRange(0, e.target.value.length);

  return (
    <Box
      ref={setElementRef()}
      className={clsx("react-select", classes.select, {
        [classes["select--open"]]: shouldOpen,
      })}
    >
      <input
        className={classes["select__hidden"]}
        autoComplete={autoComplete}
        name={name}
        defaultValue={defaultValue.value}
      />
      <Box className={classes["select__container"]}>
        <Box className={classes["select__title"]}>
          <input
            ref={inputRef}
            className={classes["input__field"]}
            value={searchPhrase}
            onChange={(e) => {
              const { value } = e.target;
              setSearchPhrase(value);
              if (isAutofilled(searchPhrase, value)) {
                const country = findAutofilledOption(options, value);
                return country && updateOptions(country, onChange);
              }
            }}
            onClick={(e) => {
              changeSelectionRange(e);
              if (open) {
                resetInputValueToDefault();
              }
              setOpen(!open);
            }}
          />
          {renderLabel(label)}
        </Box>

        <Box
          className={clsx(classes["select__options"], {
            [classes["select__options--open"]]: shouldOpen,
          })}
        >
          <SelectOptionsList
            ref={activeOptionRef}
            activeOption={defaultValue}
            options={shouldSearch ? filterList({ searchPhrase, options }) : options}
            onChange={onChange}
            setOpen={setOpen}
            updateOptions={updateOptions}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Select;
