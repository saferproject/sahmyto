import User from "@/app/_interfaces/user";
import { ProfileFormType } from "../_schemas/profile-schema";
import { fetchWithAuth } from "@/app/proxy";

export const loginService = {
  completeProfile: (body: ProfileFormType) =>
    fetchWithAuth<User>("user/updateProfile", {
      body: JSON.stringify(body),
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }),
};
