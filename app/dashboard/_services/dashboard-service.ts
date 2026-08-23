import User from "@/app/_interfaces/user";
import { http } from "@/app/_services/http";
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
    http.get<User>("user/profile", { signal, redirectOnUnauthorized }),
  userLogout: () => http.post<undefined>("user/logout"),
  getKarboomRequests: (signal?: AbortSignal) =>
    http.get<KarboomRequest[]>("karboom/requests", { signal }),
  acceptKarboomRequest: (requestId: number) =>
    http.post<undefined>(`karboom/requests/accept/${requestId}`),
  rejectKarboomRequest: (requestId: number) =>
    http.post<undefined>(`karboom/requests/reject/${requestId}`),
};
