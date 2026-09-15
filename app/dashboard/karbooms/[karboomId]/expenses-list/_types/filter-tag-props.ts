import { FilterTag } from "../_types/filter-tag";

type FilterTagProps = {
  tag: FilterTag;
  selectedTagId: number;
  onSelectTag: (tag: FilterTag) => void;
};

export default FilterTagProps;
