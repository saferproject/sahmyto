import { http } from "@/app/_services/http";
import { Session } from "../_types/session";
import addPaginationQuery from "@/app/_utilities/add-pagination-query";

export const sessionsService = {
  getSessions: (signal?: AbortSignal, page: number = 1) =>
    http.get<Session[]>(addPaginationQuery("user/sessions", page), {
      signal,
    }),
  invalidateSession: (sessionId: number) =>
    http.delete(`user/sessions/${sessionId}`),
  invalidateAllSessions: () => http.delete("user/sessions/others"),
};
