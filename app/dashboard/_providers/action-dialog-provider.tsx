"use client";

import { createStoreContext } from "@/app/_utilities/create-store-context";
import ActionDialogStore from "../_types/action-dialog-store";
import { createActionDialogStore } from "../_stores/action-dialog-store";

export const [ActionDialogStoreProvider, useActionDialogStore] =
  createStoreContext<ActionDialogStore>(
    createActionDialogStore,
    "useActionDialogStore",
  );
