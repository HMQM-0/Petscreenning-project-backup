import { ActiveProductFiltersProps } from "./components/ActiveProductFilters";

export interface IProps {
  attributes: ActiveProductFiltersProps["attributes"];
  numberOfProducts: number;
  openDirectoryMenu: () => void;
  openFiltersMenu: () => void;
}
