import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { karboomService } from "../_services/karboom-service";
import { KarboomFormType } from "../_schemas/karboom-form-schema";

export default function useCreateKarboomEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["create-karboom"],
    mutationFn: (body: KarboomFormType) => karboomService.createKarboom(body),
    invalidateQueries: [["karbooms"]],
  });
}
