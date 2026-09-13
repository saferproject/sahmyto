"use client";

import { Badge, IconButton } from "@mui/material";
import ListFiltersButtonComponent from "@/app/dashboard/_components/list-filters-button-component";
import { ArrowForward, SearchStatus } from "iconsax-reactjs";
import { ListHeaderProps } from "../_types/list-header-props";
import { useRouter } from "next/navigation";

export default function ListHeaderLayout({
  title,
  onOpenFilters,
  activeFilterCount = 0,
  filters,
  hideBackButton = false,
}: ListHeaderProps) {
  const router = useRouter();

  const handleReturn = () => {
    router.push("/dashboard/karbooms");
  };

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h2 className="text-body text-right text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          {filters ? (
            <ListFiltersButtonComponent
              filters={filters}
              title={`فیلتر ${title}`}
            />
          ) : (
            <IconButton onClick={onOpenFilters} aria-label="فیلترها">
              <Badge badgeContent={activeFilterCount} color="primary">
                <SearchStatus size="24" className="text-primary" />
              </Badge>
            </IconButton>
          )}
          {!hideBackButton && (
            <IconButton onClick={handleReturn}>
              <ArrowForward size="32" className="text-primary rotate-y-180" />
            </IconButton>
          )}
        </div>
      </div>
    </>
  );
}
