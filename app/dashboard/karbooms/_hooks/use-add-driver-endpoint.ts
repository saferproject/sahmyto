import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { driverFormService } from "../_services/driver-form-service";

export default function useAddDriver() {
  return useInvalidatingMutation({
    mutationKey: ["add-driver"],
    mutationFn: driverFormService.addDriver,
    invalidateQueries: [["drivers"], ["members"]],
  });
}
