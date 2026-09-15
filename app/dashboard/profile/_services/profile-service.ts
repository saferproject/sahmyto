import User from "@/app/_types/user";
import { http } from "@/app/_services/http";
import { ProfileFormType } from "../_schemas/profile-schema";

export const profileService = {
  completeProfile: (body: ProfileFormType) =>
    http.put<User>("user/updateProfile", { body }),
};
