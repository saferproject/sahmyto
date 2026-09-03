import { http } from "@/app/_services/http";
import { Driver } from "../_types/driver";
import addPaginationQuery from "@/app/_utilities/add-pagination-query";

export const driversListService = {
  getDrivers: (karboomId: number, signal?: AbortSignal, page: number = 1) =>
    http.get<Driver[]>(
      addPaginationQuery(`karboom/drivers/${karboomId}`, page),
      { signal },
    ),
  deleteDriver: (driverId: number) =>
    http.delete<void>(`karboom/drivers/delete/${driverId}`),
};
