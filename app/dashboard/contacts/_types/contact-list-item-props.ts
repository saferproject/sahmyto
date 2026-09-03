import { Contact } from "./contact";

export type ContactListItemProps = {
  index: number;
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onSelect?: (contact: Contact) => void;
};
