import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { PartnersListService } from "../_services/partners-list-service";

export default function useDeletePartnerEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["delete-partner"],
    mutationFn: PartnersListService.deletePartner,
    invalidateQueries: [["partners"]],
  });
}
