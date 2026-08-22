import { http } from "@/app/_services/http";
import { Driver } from "../_types/driver";

export const DriversListService = {
  getDrivers: (karboomId: number, signal?: AbortSignal) =>
    http.get<Driver[]>(`karboom/drivers/${karboomId}?`, { signal }),
  deleteDriver: (driverId: number) =>
    http.delete<void>(`karboom/drivers/delete/${driverId}`),
};
