import { fetchWithAuth } from "@/app/proxy";
import { AddBonusPenaltyDriverBody } from "../_types/add-bonus-penalty-driver-body";
import { DriverSalary } from "../_types/driver-salary";

export const driversSalaryService = {
  getDriversSalary: (monthId: number) =>
    fetchWithAuth<DriverSalary[]>(`karboom/adjustments/${monthId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  addBonusOrPenaltyForDriver: ({
    financialMonthId,
    driverId,
    ...body
  }: AddBonusPenaltyDriverBody) =>
    fetchWithAuth<undefined>(
      `karboom/adjustments/month/${financialMonthId}/driver/${driverId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    ),
  deleteBonusOrPenaltyForDriver: (driverSalaryId: number) =>
    fetchWithAuth<undefined>(
      `karboom/adjustments/adjustments/${driverSalaryId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    ),
};