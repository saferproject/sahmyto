import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partnerFormService } from "../_services/partner-form-service";

export default function useEditPartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit-partner"],
    mutationFn: partnerFormService.editPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
}
