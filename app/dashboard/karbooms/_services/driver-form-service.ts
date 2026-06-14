import { fetchWithAuth } from "@/app/proxy";
import AddDriverDataType from "../_types/add-driver-data-type";

export const driverFormService = {
  addDriver: ({ karboom_id, ...other }: AddDriverDataType) =>
    fetchWithAuth<void>(`karboom/drivers/store/${karboom_id}`, {
      body: JSON.stringify(other),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
};
