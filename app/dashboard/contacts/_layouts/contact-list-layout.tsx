import { AnimatePresence } from "motion/react";

import QueryState from "@/app/_components/query-state";

import ListFooterLayout from "../../karbooms/_layouts/list-footer-layout";
import ContactListItemComponent from "../_components/contact-list-item-component";
import useGetContacts from "../_hooks/use-get-contacts";
import { ContactListLayoutProps } from "../_types/contact-list-layout-props";
import InfiniteScrollTrigger from "@/app/_components/infinite-scroll-trigger";

export default function ContactListLayout({
  onAdd,
  onEdit,
  onSelect,
}: ContactListLayoutProps) {
  const {
    data: contacts,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetContacts();

  return (
    <>
      <QueryState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!contacts?.data.length}
      >
        <ul className="flex w-full flex-col gap-4 pb-20">
          <AnimatePresence>
            {contacts?.data.map((contact, index) => (
              <ContactListItemComponent
                key={contact.id}
                contact={contact}
                index={index}
                onEdit={onEdit}
                onSelect={onSelect}
              />
            ))}
          </AnimatePresence>
        </ul>
        <InfiniteScrollTrigger
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </QueryState>
      <ListFooterLayout onAdd={onAdd} />
    </>
  );
}
