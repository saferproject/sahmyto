"use client";

import { AnimatePresence } from "motion/react";

import PartnersListProps from "../_interfaces/partners-list-props";
import PartnersListItemComponent from "./partners-list-item-component";

export default function PartnersListComponent({ partners }: PartnersListProps) {
  return (
    <ul className="mt-4 flex w-full flex-col gap-6 overflow-x-hidden py-4">
      <AnimatePresence>
        {partners.map((partner, index) => (
          <PartnersListItemComponent
            key={partner.id}
            item={partner}
            index={index}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
