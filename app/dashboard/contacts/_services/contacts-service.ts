import { http } from "@/app/_services/http";
import { Contact } from "../_types/contact";
import { ContactFormType } from "../_schemas/contact-form-schema";
import { EditContactBody } from "../_types/edit-contact-body";
import addPaginationQuery from "@/app/_utilities/add-pagination-query";

export const contactsService = {
  getContacts: (signal?: AbortSignal, page: number = 1) =>
    http.get<Contact[]>(addPaginationQuery("user/contacts", page), { signal }),
  addContact: (body: ContactFormType) =>
    http.post<undefined>("user/contacts", { body }),
  editContact: ({ contactId, ...body }: EditContactBody) =>
    http.put<undefined>(`user/contacts/${contactId}`, { body }),
  deleteContact: (contactId: number) =>
    http.delete<undefined>(`user/contacts/${contactId}`),
};
