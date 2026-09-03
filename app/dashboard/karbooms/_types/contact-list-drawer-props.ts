import { Contact } from "../../contacts/_types/contact";

export type ContactListDrawerProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (contact: Contact) => void;
};
