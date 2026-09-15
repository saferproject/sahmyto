import User from "@/app/_types/user";
import { fetchWithAuth } from "@/app/proxy";

export const profileImageService = {
  uploadProfileImage: (body: FormData) =>
    fetchWithAuth<User>("user/updateAvatar", {
      body,
      method: "POST",
    }),
};
