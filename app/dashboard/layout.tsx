"use client";

import { SnackbarProvider } from "notistack";

import DashboardLayoutProps from "./_interfaces/dashboard-layout-props";

import DashboardHeader from "./_components/dashboard-header";

import ThemeRegistry from "../theme-registry";

import { ReactQueryProvider } from "../query-client";

import { UserInfoStoreProvider } from "../_providers/user-info-provider";
import { ConfirmationDialogStoreProvider } from "./_providers/confirmation-dialog-provider";
import { KarboomsStoreProvider } from "./karbooms/_providers/karbooms-store-provider";

import { AuthenticationGuard } from "./_utilities/authentication-guard";

import ActionDialogComponent from "./_components/action-dialog-component";
import ConfirmationDialog from "./_components/confirmation-dialog";

import { ActionDialogStoreProvider } from "./_providers/action-dialog-provider";

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ThemeRegistry>
      <ActionDialogStoreProvider>
        <ConfirmationDialogStoreProvider>
          <UserInfoStoreProvider>
            <SnackbarProvider
              maxSnack={3}
              autoHideDuration={4000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              preventDuplicate
            >
              <ReactQueryProvider>
                <AuthenticationGuard>
                  <KarboomsStoreProvider>
                    <ConfirmationDialog />
                    <ActionDialogComponent />
                    <DashboardHeader />
                    <main className="flex size-full h-dvh min-h-0 flex-1 flex-col gap-4 overflow-x-visible overflow-y-auto px-4 pt-26 pb-20">
                      {children}
                    </main>
                  </KarboomsStoreProvider>
                </AuthenticationGuard>
              </ReactQueryProvider>
            </SnackbarProvider>
          </UserInfoStoreProvider>
        </ConfirmationDialogStoreProvider>
      </ActionDialogStoreProvider>
    </ThemeRegistry>
  );
}
