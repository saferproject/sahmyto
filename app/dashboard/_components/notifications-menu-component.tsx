"use client";

import { CircularProgress, Menu } from "@mui/material";

import QueryState from "@/app/_components/query-state";

import requestsMenuProps from "../_interfaces/notifications-menu-props";
import RequestComponent from "./request-component";

export default function requestsMenuComponent({
  anchorEl,
  isOpen,
  onClose,
  requests,
  isLoading,
  isError,
  onAccept,
  onReject,
  mutatingRequest,
  requestIsAccepting,
  requestIsRejecting,
}: requestsMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      slotProps={{
        root: { sx: { marginTop: "8px" } },
        backdrop: { sx: { backgroundColor: "#66666688" } },
        list: {
          sx: {
            padding: 0,
          },
        },
        paper: {
          sx: {
            width: "min(420px, calc(100vw - 24px))",
            borderRadius: "24px",
            padding: "0",
            maxHeight: "80vh",
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        },
      }}
    >
      <QueryState
        isLoading={isLoading}
        isError={isError}
        isEmpty={requests.length === 0}
        loadingFallback={
          <div className="flex items-center justify-center bg-white py-6">
            <CircularProgress size={24} color="primary" />
          </div>
        }
        errorFallback={
          <p className="text-body bg-white py-6 text-center text-sm font-semibold">
            خطا در دریافت درخواست‌ها
          </p>
        }
        emptyFallback={
          <p className="text-body bg-white py-6 text-center text-sm font-semibold">
            درخواست جدیدی ندارید!
          </p>
        }
      >
        <ul className="flex flex-col gap-4">
          {requests.map((request) => (
            <RequestComponent
              key={request.id}
              request={request}
              onAccept={onAccept}
              onReject={onReject}
              mutatingRequest={mutatingRequest}
              requestIsAccepting={requestIsAccepting}
              requestIsRejecting={requestIsRejecting}
            />
          ))}
        </ul>
      </QueryState>
    </Menu>
  );
}
