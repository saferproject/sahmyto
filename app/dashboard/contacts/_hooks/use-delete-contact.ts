import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";
import { contactsService } from "../_services/contacts-service";

export default function useDeleteContact() {
  return useInvalidatingMutation({
    mutationKey: ["delete-contact"],
    mutationFn: contactsService.deleteContact,
    invalidateQueries: [["contacts"]],
  });
}
