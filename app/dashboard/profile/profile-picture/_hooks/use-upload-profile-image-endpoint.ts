import { useMutation, useQueryClient } from "@tanstack/react-query";

import { profileImageService } from "../_services/profile-image-service";

export default function useUploadProfileImageEndpoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["upload-profile-image"],
    mutationFn: profileImageService.uploadProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
