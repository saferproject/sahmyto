import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { driverFormService } from "../_services/driver-form-service";

export default function useEditDriver() {
  return useInvalidatingMutation({
    mutationKey: ["edit-driver"],
    mutationFn: driverFormService.editDriver,
    invalidateQueries: [["drivers"], ["members"]],
  });
}
