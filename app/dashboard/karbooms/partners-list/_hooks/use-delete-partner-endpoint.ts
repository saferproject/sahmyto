import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { partnersListService } from "../_services/partners-list-service";

export default function useDeletePartnerEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["delete-partner"],
    mutationFn: partnersListService.deletePartner,
    invalidateQueries: [["partners"]],
  });
}
