"use client";

import { createStoreContext } from "@/app/_utilities/create-store-context";
import { createConfirmationDialogStore } from "../_stores/confirmation-dialog-store";
import ConfirmationDialogStore from "../_types/confirmation-dialog-store";

export const [ConfirmationDialogStoreProvider, useConfirmationDialogStore] =
  createStoreContext<ConfirmationDialogStore>(
    createConfirmationDialogStore,
    "useConfirmationDialogStore",
  );
