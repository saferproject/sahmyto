import SearchInputComponent from "../../_components/search-input-component";
import FilterTagComponent from "../_components/filter-tag-component";

import { EXPENSE_FILTER_TAGS } from "../_constants/expense-filter-tags";

import { ExpenseListHeaderProps } from "../_types/expense-list-header-props";
import { FilterTag } from "../_types/filter-tag";
import { WalletMinus } from "iconsax-reactjs";

export default function ExpenseListHeaderLayout({
  selectedTagId,
  onTagSelect,
}: ExpenseListHeaderProps) {
  const handleSelectTag = (tag: FilterTag) => {
    onTagSelect(tag);
  };

  return (
    <>
      <h2 className="text-body w-full text-center text-lg font-semibold">
        لیست هزینه ها
      </h2>
      <SearchInputComponent />
      <div className="flex items-center gap-4">
        {EXPENSE_FILTER_TAGS.map((filter) => (
          <FilterTagComponent
            tag={filter}
            key={filter.id}
            selectedTagId={selectedTagId}
            onSelectTag={handleSelectTag}
          />
        ))}
      </div>
    </>
  );
}
