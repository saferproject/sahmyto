import User from "@/app/_interfaces/user";
import { fetchWithAuth } from "@/app/proxy";
import { KarboomRequest } from "../_types/karboom-request";

export const dashboardService = {
  getProfileInfo: () =>
    fetchWithAuth<User>("user/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  userLogout: () =>
    fetchWithAuth<undefined>("user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
  getKarboomRequests: () =>
    fetchWithAuth<KarboomRequest[]>("karboom/requests", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  acceptKarboomRequest: (requestId: number) =>
    fetchWithAuth<undefined>(`karboom/requests/accept/${requestId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
  rejectKarboomRequest: (requestId: number) =>
    fetchWithAuth<undefined>(`karboom/requests/reject/${requestId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
};
