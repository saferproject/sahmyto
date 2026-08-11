import { useMutation } from "@tanstack/react-query";
import { loginService } from "../_services/profile-service";

export default function useCompleteProfileEndpoint() {
  return useMutation({
    mutationFn: loginService.completeProfile,
  });
}
