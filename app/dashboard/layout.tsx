"use client";

import { SnackbarProvider } from "notistack";

import DashboardLayoutProps from "./_interfaces/dashboard-layout-props";

import DashboardHeader from "./_components/dashboard-header";
import DashboardFooter from "./_components/dashboard-footer";
import ConfirmationDialogComponent from "./_components/confirmation-dialog-component";

import ThemeRegistry from "../theme-registry";

import { ReactQueryProvider } from "../query-client";

import { UserInfoStoreProvider } from "../_providers/user-info-provider";
import { ConfirmationDialogStoreProvider } from "./_providers/confirmation-dialog-provider";

import { AuthenticationGuard } from "./_utilities/authentication-guard";
import ActionDialogComponent from "./_components/action-dialog-component";
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
                  <div className="flex h-dvh w-full flex-col justify-between">
                    <ConfirmationDialogComponent />
                    <ActionDialogComponent />
                    <DashboardHeader />
                    <main className="flex w-full min-h-0 flex-1 flex-col items-center overflow-x-hidden overflow-y-auto px-8 py-2">
                      {children}
                    </main>
                    <DashboardFooter />
                  </div>
                </AuthenticationGuard>
              </ReactQueryProvider>
            </SnackbarProvider>
          </UserInfoStoreProvider>
        </ConfirmationDialogStoreProvider>
      </ActionDialogStoreProvider>
    </ThemeRegistry>
  );
}
