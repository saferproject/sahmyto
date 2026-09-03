import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { profileImageService } from "../_services/profile-image-service";

export default function useUploadProfileImageEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["upload-profile-image"],
    mutationFn: profileImageService.uploadProfileImage,
    invalidateQueries: [["profile"]],
  });
}
