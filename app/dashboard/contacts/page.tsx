"use client";

import { useState } from "react";
import ListHeaderLayout from "../karbooms/_layouts/list-header-layout";
import ContactListLayout from "./_layouts/contact-list-layout";
import ContactFormDrawerComponent from "./_components/contact-drawer-component";
import { FormStates } from "../_types/form-states";
import { Contact } from "./_types/contact";

export default function ContactsPage() {
  const [isContactFormDrawerOpen, setContactFormDrawerOpen] = useState(false);
  const [contactFormState, setContactFormState] = useState<FormStates>("ADD");
  const [selectedContact, setSelectedContact] = useState<Contact>();

  const handleOpenContactForm = () => {
    setContactFormDrawerOpen(true);
  };

  const handleCloseContactForm = () => {
    setContactFormDrawerOpen(false);
  };

  const handleAddContact = () => {
    setContactFormState("ADD");
    setSelectedContact(undefined);
    handleOpenContactForm();
  };

  const handleEditContact = (contact: Contact) => {
    setContactFormState("EDIT");
    setSelectedContact(contact);
    handleOpenContactForm();
  };

  const handleContactFormSuccess = () => {
    setContactFormDrawerOpen(false);
    setContactFormState("ADD");
    setSelectedContact(undefined);
  };

  return (
    <>
      <ListHeaderLayout title="لیست مخاطبین" />
      <ContactListLayout onAdd={handleAddContact} onEdit={handleEditContact} />
      <ContactFormDrawerComponent
        formState={contactFormState}
        contact={selectedContact}
        isOpen={isContactFormDrawerOpen}
        onOpen={handleOpenContactForm}
        onClose={handleCloseContactForm}
        onSuccess={handleContactFormSuccess}
      />
    </>
  );
}
