import { Driver } from "./driver";

export type DriversListProps = {
  drivers: Driver[];
  onEdit: (driver: Driver) => void;
};
