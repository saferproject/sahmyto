"use client";

import { Menu } from "@mui/material";

import requestsMenuProps from "../_interfaces/notifications-menu-props";
import RequestComponent from "./request-component";

export default function requestsMenuComponent({
  anchorEl,
  isOpen,
  onClose,
  requests,
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
      {requests.length === 0 ? (
        <p className="text-body bg-white py-6 text-center text-sm font-semibold">
          درخواست جدیدی ندارید!
        </p>
      ) : (
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
      )}
    </Menu>
  );
}
