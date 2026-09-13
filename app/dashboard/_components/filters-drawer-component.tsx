"use client";

import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import FormDrawerWithTitleComponent from "@/app/_components/form-drawer-with-title-component";
import { FILTER_COMPONENT_TYPES } from "../_constants/filter-component-types";
import useListFilters from "../_hooks/use-list-filters";
import type { Filter, FilterValues } from "../_types/filter";
import type { FiltersDrawerProps } from "../_types/filters-drawer-props";
import { emptyFilterValues } from "../_utilities/list-filters";

function FiltersForm({
  filters,
  values,
  onApply,
}: {
  filters: readonly Filter[];
  values: FilterValues;
  onApply: (values: FilterValues) => void;
}) {
  const { control, handleSubmit } = useForm<FilterValues>({
    defaultValues: values,
  });

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(onApply)}
      noValidate
    >
      {filters.map((filter) => {
        const Component = FILTER_COMPONENT_TYPES[filter.type];
        return (
          <Component key={filter.name} filter={filter} control={control} />
        );
      })}
      <div className="flex w-full gap-3">
        <Button type="submit" variant="contained" fullWidth>
          اعمال فیلتر
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => onApply(emptyFilterValues(filters))}
          fullWidth
        >
          پاک کردن
        </Button>
      </div>
    </form>
  );
}

export default function FiltersDrawerComponent({
  isOpen,
  title,
  filters,
  onOpen,
  onClose,
}: FiltersDrawerProps) {
  const { values, apply } = useListFilters(filters);

  return (
    <FormDrawerWithTitleComponent
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      title={title}
    >
      {isOpen && (
        <FiltersForm
          key={JSON.stringify(values)}
          filters={filters}
          values={values}
          onApply={(draft) => {
            apply(draft);
            onClose();
          }}
        />
      )}
    </FormDrawerWithTitleComponent>
  );
}
