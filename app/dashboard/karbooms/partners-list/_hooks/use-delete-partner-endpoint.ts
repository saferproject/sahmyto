import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PartnersListService } from "../_services/partners-list-service";

export default function useDeletePartnerEndpoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-partner"],
    mutationFn: PartnersListService.deletePartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
}
