import { Contact } from "./contact";

export type ContactListLayoutProps = {
  onAdd: () => void;
  onEdit: (contact: Contact) => void;
  onSelect?: (contact: Contact) => void;
};