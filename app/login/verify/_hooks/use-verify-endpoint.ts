import { useMutation } from "@tanstack/react-query";
import { verifyService } from "../_services/verify-service";

export default function useVerify() {
  return useMutation({
    mutationKey: ["USER_INFO"],
    mutationFn: verifyService.verify,
  });
}
