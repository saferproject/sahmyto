"use client";

import { AnimatePresence } from "motion/react";

import { DriversListProps } from "../_types/drivers-list-props";
import DriverListItemComponent from "./driver-list-item-component";

export default function DriversListComponent({
  drivers,
  onEdit,
}: DriversListProps) {
  return (
    <ul className="flex w-full flex-col gap-8 pt-4">
      <AnimatePresence>
        {drivers.map((driver, index) => (
          <DriverListItemComponent
            key={driver.id}
            driver={driver}
            index={index}
            onEdit={onEdit}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
