import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { partnerFormService } from "../_services/partner-form-service";

export default function useEditPartner() {
  return useInvalidatingMutation({
    mutationKey: ["edit-partner"],
    mutationFn: partnerFormService.editPartner,
    invalidateQueries: [["partners"]],
  });
}
