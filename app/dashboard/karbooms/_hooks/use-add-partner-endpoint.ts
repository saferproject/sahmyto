import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { partnerFormService } from "../_services/partner-form-service";

export default function useAddPartner() {
  return useInvalidatingMutation({
    mutationKey: ["add-partner"],
    mutationFn: partnerFormService.addPartner,
    invalidateQueries: [["partners"]],
  });
}
