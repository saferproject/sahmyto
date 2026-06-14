import { fetchWithAuth } from "@/app/proxy";
import { Driver } from "../_types/driver";

export const DriversListService = {
  getDrivers: (karboomId: number) =>
    fetchWithAuth<Driver[]>(`karboom/drivers/${karboomId}?`, {
      method: "GET",
    }),
};
