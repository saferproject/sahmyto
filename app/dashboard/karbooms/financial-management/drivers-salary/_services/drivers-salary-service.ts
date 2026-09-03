import { http } from "@/app/_services/http";
import { AddBonusPenaltyDriverBody } from "../_types/add-bonus-penalty-driver-body";
import { DriverSalary } from "../_types/driver-salary";
import addPaginationQuery from "@/app/_utilities/add-pagination-query";

export const driversSalaryService = {
  getDriversSalary: (monthId: number, signal?: AbortSignal, page: number = 1) =>
    http.get<DriverSalary[]>(
      addPaginationQuery(`karboom/adjustments/${monthId}`, page),
      { signal },
    ),
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
