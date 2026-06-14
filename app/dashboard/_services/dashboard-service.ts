import User from "@/app/_interfaces/user";
import { fetchWithAuth } from "@/app/proxy";

export const dashboardService = {
  getProfileInfo: () =>
    fetchWithAuth<User>("user/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  userLogout: () =>
    fetchWithAuth<void>("user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
};
