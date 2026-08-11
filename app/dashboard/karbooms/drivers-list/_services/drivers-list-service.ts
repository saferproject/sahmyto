import { fetchWithAuth } from "@/app/proxy";
import { Driver } from "../_types/driver";

export const DriversListService = {
  getDrivers: (karboomId: number, signal?: AbortSignal) =>
    fetchWithAuth<Driver[]>(`karboom/drivers/${karboomId}?`, {
      method: "GET",
      signal,
    }),
  deleteDriver: (driverId: number) =>
    fetchWithAuth<void>(`karboom/drivers/delete/${driverId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }),
};
