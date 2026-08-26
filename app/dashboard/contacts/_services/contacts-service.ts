import { http } from "@/app/_services/http";
import { Contact } from "../_types/contact";
import { ContactFormType } from "../_schemas/contact-form-schema";
import { EditContactBody } from "../_types/edit-contact-body";

export const contactsService = {
  getContacts: (signal?: AbortSignal) =>
    http.get<Contact[]>("user/contacts", { signal }),
  addContact: (body: ContactFormType) =>
    http.post<undefined>("user/contacts", { body }),
  editContact: ({ contactId, ...body }: EditContactBody) =>
    http.put<undefined>(`user/contacts/${contactId}`, { body }),
  deleteContact: (contactId: number) =>
    http.delete<undefined>(`user/contacts/${contactId}`),
};
