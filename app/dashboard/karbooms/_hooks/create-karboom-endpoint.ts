import { useMutation, useQueryClient } from "@tanstack/react-query";
import { karboomService } from "../_services/karboom-service";
import BaseResponse from "@/app/_interfaces/base-response";
import { KarboomFormType } from "../_schemas/karboom-form-schema";
import Karboom from "@/app/_interfaces/karboom";

export default function useCreateKarboom() {
  const queryClient = useQueryClient();

  return useMutation<BaseResponse<Karboom>, BaseResponse, KarboomFormType>({
    mutationKey: ["create-karboom"],
    mutationFn: karboomService.createKarboom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["karbooms"] });
    },
  });
}
