import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { driversSalaryService } from "../_services/drivers-salary-service";

export default function useAddBonusPenaltyDriverEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["add-bonus-penalty-driver"],
    mutationFn: driversSalaryService.addBonusOrPenaltyForDriver,
    invalidateQueries: [["drivers-salary"]],
  });
}
