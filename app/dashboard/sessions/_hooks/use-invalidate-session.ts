import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";
import { sessionsService } from "../_services/sessions-service";

export default function useInvalidateSessions() {
  return useInvalidatingMutation({
      mutationKey: ["invalidate-session"],
      mutationFn: sessionsService.invalidateSession,
      invalidateQueries: [["sessions"]],
    });
}