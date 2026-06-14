import { FilterTag } from "./filter-tag";

export type ExpenseListHeaderProps = {
  selectedTagId: number;
  onTagSelect: (tag: FilterTag) => void;
};
