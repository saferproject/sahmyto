import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";
import { sessionsService } from "../_services/sessions-service";

export default function useInvalidateSessions() {
  return useInvalidatingMutation({
      mutationKey: ["invalidate-all-sessions"],
      mutationFn: sessionsService.invalidateAllSessions,
      invalidateQueries: [["sessions"]],
    });
}