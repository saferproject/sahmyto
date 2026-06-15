import { useMutation } from "@tanstack/react-query";
import { loginService } from "../_services/profile-service";

export default function useCompleteProfile() {
  return useMutation({
    mutationFn: loginService.completeProfile,
  });
}
