import { useState } from "react";

import SearchInputComponent from "../../_components/search-input-component";
import FilterTagComponent from "../_components/filter-tag-component";

import { EXPENSE_FILTER_TAGS } from "../_constants/expense-filter-tags";

import { ExpenseListHeaderProps } from "../_types/expense-list-header-props";
import { FilterTag } from "../_types/filter-tag";

export default function ExpenseListHeaderLayout({
  selectedTagId,
  onTagSelect,
}: ExpenseListHeaderProps) {
  const handleSelectTag = (tag: FilterTag) => {
    onTagSelect(tag);
  };

  return (
    <>
      <SearchInputComponent />
      <div className="flex items-center gap-4">
        {EXPENSE_FILTER_TAGS.map((filter, index) => (
          <FilterTagComponent
            tag={filter}
            key={index}
            selectedTagId={selectedTagId}
            onSelectTag={handleSelectTag}
          />
        ))}
      </div>
    </>
  );
}
