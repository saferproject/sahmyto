import { fetchWithAuth } from "@/app/proxy";
import AddDriverDataType from "../_types/add-driver-data-type";
import EditDriverDataType from "../_types/edit-driver-data-type";

export const driverFormService = {
  addDriver: ({ karboom_id, ...other }: AddDriverDataType) =>
    fetchWithAuth<void>(`karboom/drivers/store/${karboom_id}`, {
      body: JSON.stringify(other),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
  editDriver: ({ driver_id, ...other }: EditDriverDataType) =>
    fetchWithAuth<void>(`karboom/drivers/edit/${driver_id}`, {
      body: JSON.stringify(other),
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }),
};