import type { Filter } from "@/app/dashboard/_types/filter";

export type ListHeaderProps = {
  title: string;
  onOpenFilters?: () => void;
  activeFilterCount?: number;
  filters?: readonly Filter[];
  hideBackButton?: boolean;
};
