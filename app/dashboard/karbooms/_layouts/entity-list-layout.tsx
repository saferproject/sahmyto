"use client";

import { AnimatePresence } from "motion/react";
import type { ReactNode } from "react";

import QueryState from "@/app/_components/query-state";

import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";
import ListFooterLayout from "./list-footer-layout";

interface EntityListLayoutProps<T> {
  items: T[] | undefined;
  isLoading: boolean;
  isError: boolean;
  renderItem: (item: T, index: number) => ReactNode;
  onAdd: () => void;
  header?: ReactNode;
}

export default function EntityListLayout<T>({
  items,
  isLoading,
  isError,
  renderItem,
  onAdd,
  header,
}: EntityListLayoutProps<T>) {
  return (
    <>
      {header}
      <SelectedKarboomInfoComponent />
      <QueryState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!items?.length}
      >
        <ul className="flex w-full flex-col gap-4">
          <AnimatePresence>
            {items?.map((item, index) => renderItem(item, index))}
          </AnimatePresence>
        </ul>
      </QueryState>
      <ListFooterLayout onAdd={onAdd} />
    </>
  );
}
