import { http } from "@/app/_services/http";
import { AddBonusPenaltyDriverBody } from "../_types/add-bonus-penalty-driver-body";
import { DriverSalary } from "../_types/driver-salary";

export const driversSalaryService = {
  getDriversSalary: (monthId: number, signal?: AbortSignal) =>
    http.get<DriverSalary[]>(`karboom/adjustments/${monthId}`, { signal }),
  addBonusOrPenaltyForDriver: ({
    financialMonthId,
    driverId,
    ...body
  }: AddBonusPenaltyDriverBody) =>
    http.post<undefined>(
      `karboom/adjustments/month/${financialMonthId}/driver/${driverId}`,
      { body },
    ),
  deleteBonusOrPenaltyForDriver: (driverSalaryId: number) =>
    http.delete<undefined>(`karboom/adjustments/adjustments/${driverSalaryId}`),
};
