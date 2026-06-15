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


export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ThemeRegistry>
      <ConfirmationDialogStoreProvider>
        <UserInfoStoreProvider>
          <SnackbarProvider
            maxSnack={2}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            preventDuplicate
          >
            <ReactQueryProvider>
              <AuthenticationGuard>
                <div className="flex h-screen w-screen flex-col justify-between">
                  <ConfirmationDialogComponent />
                  <DashboardHeader />
                  <main className="flex h-[calc(100%-236px)] w-full flex-col items-center overflow-hidden px-8 py-2">
                    {children}
                  </main>
                  <DashboardFooter />
                </div>
              </AuthenticationGuard>
            </ReactQueryProvider>
          </SnackbarProvider>
        </UserInfoStoreProvider>
      </ConfirmationDialogStoreProvider>
    </ThemeRegistry>
  );
}
