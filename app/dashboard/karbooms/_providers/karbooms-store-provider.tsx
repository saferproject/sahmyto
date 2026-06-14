"use client";

import { createStoreContext } from "@/app/_utilities/create-store-context";
import { createKarboomsStore } from "../_store/karbooms-store";
import KarboomsStore from "../_types/karbooms-store-type";

export const [KarboomsStoreProvider, useKarboomsStore] =
  createStoreContext<KarboomsStore>(createKarboomsStore, "useKarboomsStore");
