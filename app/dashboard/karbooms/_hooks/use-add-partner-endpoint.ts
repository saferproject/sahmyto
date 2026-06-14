import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partnerFormService } from "../_services/partner-form-service";

export default function useAddPartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-partner"],
    mutationFn: partnerFormService.addPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
}
