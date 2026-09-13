"use client";

import { Suspense, useState } from "react";
import { Badge, IconButton } from "@mui/material";
import { SearchStatus } from "iconsax-reactjs";
import type { Filter } from "../_types/filter";
import useListFilters from "../_hooks/use-list-filters";
import FiltersDrawerComponent from "./filters-drawer-component";

type ListFiltersButtonProps = { filters: readonly Filter[]; title: string };

function ListFiltersButton({ filters, title }: ListFiltersButtonProps) {
  const [isOpen, setOpen] = useState(false);
  const { activeCount } = useListFilters(filters);

  return (
    <>
      <IconButton
        aria-label="فیلترها"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <Badge badgeContent={activeCount} color="primary">
          <SearchStatus size="24" className="text-primary" />
        </Badge>
      </IconButton>
      <FiltersDrawerComponent
        filters={filters}
        title={title}
        isOpen={isOpen}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default function ListFiltersButtonComponent(
  props: ListFiltersButtonProps,
) {
  return (
    <Suspense
      fallback={
        <IconButton aria-label="فیلترها" disabled>
          <SearchStatus size="24" />
        </IconButton>
      }
    >
      <ListFiltersButton {...props} />
    </Suspense>
  );
}
