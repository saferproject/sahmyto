import { http } from "@/app/_services/http";
import AddDriverDataType from "../_types/add-driver-data-type";
import EditDriverDataType from "../_types/edit-driver-data-type";

export const driverFormService = {
  addDriver: ({ karboom_id, ...other }: AddDriverDataType) =>
    http.post<void>(`karboom/drivers/store/${karboom_id}`, { body: other }),
  editDriver: ({ driver_id, ...other }: EditDriverDataType) =>
    http.put<void>(`karboom/drivers/edit/${driver_id}`, { body: other }),
};
