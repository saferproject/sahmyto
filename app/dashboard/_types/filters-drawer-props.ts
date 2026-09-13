import { Filter } from "./filter";

export type FiltersDrawerProps = {
  isOpen: boolean;
  title: string;
  filters: readonly Filter[];
  onOpen: () => void;
  onClose: () => void;
};
