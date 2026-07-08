"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Badge, IconButton } from "@mui/material";
import { useEffect, useState, type MouseEvent } from "react";
import { User, Notification1, HamburgerMenu } from "iconsax-reactjs";

import DashboardHeaderVector from "@/app/_assets/_vectors/dashboard-header.svg";

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
    <header className="relative w-full">
      <DashboardHeaderDrawerComponent
        isOpen={isDrawerOpen}
        onOpen={handleOpenDrawer}
        onClose={handleCloseDrawer}
      />
      <Image
        src={DashboardHeaderVector}
        alt="وکتور پس زمینه هدر"
        className="h-auto w-full"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute top-4 flex w-full items-center justify-between px-8">
        <IconButton onClick={handleOpenDrawer} aria-label="باز کردن منو">
          <HamburgerMenu size={48} />
        </IconButton>
        <Image
          src="/images/logo-primary.svg"
          alt="سهمیتو"
          loading="eager"
          fetchPriority="high"
          width={100}
          height={50}
          className="relative bottom-2"
        />
        <div>
          <button
            type="button"
            aria-label="پروفایل"
            className="border-primary relative flex size-12 cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-white"
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
              <User size={24} variant="Broken" className="text-secondary" />
            )}
          </button>
          <Badge
            className="relative bottom-2 cursor-pointer"
            badgeContent={
              requests?.data && requests.data.length > 0 ? (
                <div className="text-primary flex size-5 items-center justify-center rounded-full bg-white text-lg shadow-lg">
                  {requests.data.length}
                </div>
              ) : null
            }
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <button
              type="button"
              aria-label="اعلان‌ها"
              onClick={handleOpenRequestsMenu}
              className="border-primary flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-white"
            >
              <Notification1
                size={24}
                variant="Broken"
                className="text-secondary"
              />
            </button>
          </Badge>
        </div>
      </div>
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
    </header>
  );
}
