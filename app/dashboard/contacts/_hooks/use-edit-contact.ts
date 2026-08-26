import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";
import { contactsService } from "../_services/contacts-service";

export default function useEditContact() {
  return useInvalidatingMutation({
    mutationKey: ["add-contact"],
    mutationFn: contactsService.editContact,
    invalidateQueries: [["contacts"]],
  });
}
