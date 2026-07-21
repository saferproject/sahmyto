import { fetchWithAuth } from "@/app/proxy";
import { AddBonusPenaltyDriverBody } from "../_types/add-bonus-penalty-driver-body";

export const driversSalaryService = {
  getDriversSalaryEndpoint: (monthId: number) =>
    fetchWithAuth<unknown[]>(`karboom/adjustments/adjustments/${monthId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  addBonusOrPenaltyForDriver: ({
    financialMonthId,
    driverId,
    ...body
  }: AddBonusPenaltyDriverBody) =>
    fetchWithAuth<undefined>(
      `karboom/adjustments/${financialMonthId}/drivers/${driverId}/adjustments`,
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
