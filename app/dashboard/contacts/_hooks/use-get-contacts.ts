import useListQuery from "@/app/_hooks/use-list-query";

import { contactsService } from "../_services/contacts-service";

export default function useGetContacts() {
  return useListQuery(["contacts"], contactsService.getContacts);
}
