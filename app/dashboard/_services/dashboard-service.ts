import User from "@/app/_interfaces/user";
import { fetchWithAuth } from "@/app/proxy";
import { KarboomRequest } from "../_types/karboom-request";

interface GetProfileInfoOptions {
  redirectOnUnauthorized?: boolean;
  signal?: AbortSignal;
}

export const dashboardService = {
  getProfileInfo: ({
    redirectOnUnauthorized = true,
    signal,
  }: GetProfileInfoOptions = {}) =>
    fetchWithAuth<User>("user/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      redirectOnUnauthorized,
      signal,
    }),
  userLogout: () =>
    fetchWithAuth<undefined>("user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
  getKarboomRequests: (signal?: AbortSignal) =>
    fetchWithAuth<KarboomRequest[]>("karboom/requests", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal,
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
