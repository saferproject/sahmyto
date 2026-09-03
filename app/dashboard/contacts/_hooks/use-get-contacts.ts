import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";

import { contactsService } from "../_services/contacts-service";

export default function useGetContacts() {
  return useInfiniteListQuery({
    queryKey: ["contacts"],
    queryFn: (page, signal) => contactsService.getContacts(signal, page),
  });
}
