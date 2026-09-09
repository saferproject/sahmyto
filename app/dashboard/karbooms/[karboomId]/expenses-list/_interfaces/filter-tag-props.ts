import { FilterTag } from "../_types/filter-tag";

export default interface FilterTagProps {
  tag: FilterTag;
  selectedTagId: number;
  onSelectTag: (tag: FilterTag) => void;
}
