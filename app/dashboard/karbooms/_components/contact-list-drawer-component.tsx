import { useState } from "react";
import ContactFormDrawerComponent from "../../contacts/_components/contact-drawer-component";
import ContactListLayout from "../../contacts/_layouts/contact-list-layout";
import { Contact } from "../../contacts/_types/contact";
import { FormStates } from "../../_types/form-states";
import FormDrawerComponent from "@/app/_components/form-drawer-component";
import { ContactListDrawerProps } from "../_types/contact-list-drawer-props";

export default function ContactListDrawerComponent({
  isOpen,
  onOpen,
  onClose,
  onSelect
}: ContactListDrawerProps) {
  const [isContactFormDrawerOpen, setContactFormDrawerOpen] =
    useState<boolean>(false);
  const [contactFormState, setContactFormState] = useState<FormStates>("ADD");
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();

  const handleOpenContactForm = () => {
    setContactFormState("ADD");
    setSelectedContact(undefined);
    setContactFormDrawerOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setContactFormState("EDIT");
    setSelectedContact(contact);
    setContactFormDrawerOpen(true);
  };

  const handleCloseContactForm = () => {
    setContactFormDrawerOpen(false);
    setContactFormState("ADD");
    setSelectedContact(undefined);
  };

  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h4 className="text-body text-lg font-bold mb-4">لیست مخاطبین</h4>
      <ContactListLayout
        onAdd={handleOpenContactForm}
        onEdit={handleEditContact}
        onSelect={onSelect}
      />
      <ContactFormDrawerComponent
        formState={contactFormState}
        contact={selectedContact}
        isOpen={isContactFormDrawerOpen}
        onOpen={handleOpenContactForm}
        onClose={handleCloseContactForm}
        onSuccess={handleCloseContactForm}
      />
    </FormDrawerComponent>
  );
}
