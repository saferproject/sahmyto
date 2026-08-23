"use client";

import { AnimatePresence } from "motion/react";

import KarboomListProps from "../_interfaces/karboom-list-props";
import KarboomListItemComponent from "./karboom-list-item-component";

export default function KarboomListComponent({ karbooms }: KarboomListProps) {
  return (
    <ul className="flex w-full snap-y snap-mandatory flex-col gap-4">
      <AnimatePresence>
        {karbooms.map((karboom, index) => (
          <KarboomListItemComponent
            {...karboom}
            key={karboom.id}
            index={index}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
