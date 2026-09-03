import { useMutation } from "@tanstack/react-query";
import { profileService } from "../_services/profile-service";

export default function useCompleteProfileEndpoint() {
  return useMutation({
    mutationFn: profileService.completeProfile,
  });
}
