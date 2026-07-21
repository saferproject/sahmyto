import { useMutation, useQueryClient } from "@tanstack/react-query";
import { driversSalaryService } from "../_services/drivers-salary-service";

export default function useAddBonusPenaltyDriverEndpoint() {
  const useQuery = useQueryClient();

  return useMutation({
    mutationKey: ["add-bonus-penalty-driver"],
    mutationFn: driversSalaryService.addBonusOrPenaltyForDriver,
    onSuccess: () => {
      useQuery.invalidateQueries({ queryKey: ["drivers-salary"] });
    }
  });
}