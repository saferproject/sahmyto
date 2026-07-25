"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Badge, IconButton } from "@mui/material";
import { useEffect, useState, type MouseEvent } from "react";
import { User, Notification1, HamburgerMenu } from "iconsax-reactjs";

import DashboardHeaderDrawerComponent from "./dashboard-header-drawer-component";
import RequestsMenuComponent from "./notifications-menu-component";

import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import useGetKarboomRequests from "../_hooks/use-get-karboom-requests-endpoint";
import useAcceptKarboomRequest from "../_hooks/use-accept-karboom-request-endpoint";
import useRejectKarboomRequest from "../_hooks/use-reject-karboom-request-endpoint";

export default function DashboardHeader() {
  const router = useRouter();

  const { avatar } = useUserInfoStore((state) => state);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [mutatingRequest, setMutatingRequest] = useState<number | null>(null);

  const [notificationAnchor, setNotificationAnchor] =
    useState<HTMLElement | null>(null);

  const {
    data: requests,
    isSuccess: gotRequests,
    isLoading: requestsLoading,
    isError: requestsError,
  } = useGetKarboomRequests();

  const { mutate: acceptRequest, isPending: requestIsAccepting } =
    useAcceptKarboomRequest();

  const { mutate: rejectRequest, isPending: requestIsRejecting } =
    useRejectKarboomRequest();

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleOpenRequestsMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleCloseRequestsMenu = () => {
    setNotificationAnchor(null);
  };

  const handleAcceptRequest = (id: number) => {
    setMutatingRequest(id);
    acceptRequest(id);
  };

  const handleRejectRequest = (id: number) => {
    setMutatingRequest(id);
    rejectRequest(id);
  };

  const handleNavigateToProfile = () => {
    router.push("/dashboard/profile");
  };

  useEffect(() => {
    if (gotRequests && requests.data.length === 0) handleCloseRequestsMenu();
  }, [gotRequests, requests?.data.length]);

  return (
    <header className="fixed top-4 w-full bg-transparent px-4 z-50">
      <DashboardHeaderDrawerComponent
        isOpen={isDrawerOpen}
        onOpen={handleOpenDrawer}
        onClose={handleCloseDrawer}
      />
      <RequestsMenuComponent
        anchorEl={notificationAnchor}
        isOpen={Boolean(notificationAnchor)}
        onClose={handleCloseRequestsMenu}
        requests={requests?.data ?? []}
        isLoading={requestsLoading}
        isError={requestsError}
        onAccept={handleAcceptRequest}
        onReject={handleRejectRequest}
        mutatingRequest={mutatingRequest}
        requestIsAccepting={requestIsAccepting}
        requestIsRejecting={requestIsRejecting}
      />
      <div className="bg-secondary-lightest/60 flex items-center justify-between rounded-full p-3 shadow-lg backdrop-blur-sm">
        <IconButton onClick={handleOpenDrawer} aria-label="باز کردن منو">
          <HamburgerMenu size={32} className="text-body" />
        </IconButton>
        <Image src="/images/logo-body.svg" alt="" width={64} height={32} />
        <div className="flex items-center">
          <Badge
            className="relative -left-4 z-10 cursor-pointer"
            badgeContent={
              requests?.data && requests.data.length > 0 ? (
                <div className="text-primary flex size-4 items-center justify-center rounded-full bg-white text-lg shadow-lg">
                  {requests.data.length}
                </div>
              ) : null
            }
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <button
              type="button"
              aria-label="اعلان‌ها"
              onClick={handleOpenRequestsMenu}
              className="border-primary flex size-10 cursor-pointer items-center justify-center rounded-full border bg-white"
            >
              <Notification1
                size={20}
                variant="Broken"
                className="text-secondary"
              />
            </button>
          </Badge>
          <button
            type="button"
            aria-label="پروفایل"
            className="bg-primary-light flex size-12 cursor-pointer items-center justify-center overflow-hidden rounded-full"
            onClick={handleNavigateToProfile}
          >
            {avatar ? (
              <Image
                src={avatar}
                alt="عکس پروفایل"
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <User size={24} variant="Broken" className="text-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
