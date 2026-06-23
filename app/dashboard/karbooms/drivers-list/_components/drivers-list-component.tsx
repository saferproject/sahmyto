"use client";

import { AnimatePresence } from "motion/react";

import { DriversListProps } from "../_types/drivers-list-props";
import DriverListItemComponent from "./driver-list-item-component";

export default function DriversListComponent({ drivers }: DriversListProps) {
  return (
    <ul className="pt-4 flex w-full flex-col gap-8">
      <AnimatePresence>
        {drivers.map((driver, index) => (
          <DriverListItemComponent key={driver.id} driver={driver} index={index} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
