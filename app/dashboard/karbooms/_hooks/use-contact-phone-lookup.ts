import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import useGetContacts from "@/app/dashboard/contacts/_hooks/use-get-contacts";
import { Contact } from "@/app/dashboard/contacts/_types/contact";

export type ContactIdentity = Pick<
  Contact,
  "phone" | "first_name" | "last_name"
>;

export default function useContactPhoneLookup() {
  const userPhone = useUserInfoStore((state) => state.phone);
  const firstName = useUserInfoStore((state) => state.first_name);
  const lastName = useUserInfoStore((state) => state.last_name);
  const contactsQuery = useGetContacts();

  return async (phone: string): Promise<ContactIdentity | null | undefined> => {
    if (phone === userPhone) {
      return {
        phone: userPhone,
        first_name: firstName ?? "",
        last_name: lastName ?? "",
      };
    }

    let result = contactsQuery.isSuccess
      ? contactsQuery
      : await contactsQuery.fetchNextPage({ cancelRefetch: false });

    while (result.isSuccess) {
      const contact = result.data.data.find(
        (contact) => contact.phone === phone,
      );
      if (contact) return contact;
      if (!result.hasNextPage) return null;
      result = await contactsQuery.fetchNextPage({ cancelRefetch: false });
    }

    // A failed lookup must not be treated as a missing contact.
    return undefined;
  };
}
