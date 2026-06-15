"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Badge, IconButton } from "@mui/material";
import { useState } from "react";

import DashboardHeaderVector from "@/app/_assets/_vectors/dashboard-header.svg";

import DashboardHeaderDrawerComponent from "./dashboard-header-drawer-component";

import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import { User, Notification1, HamburgerMenu } from "iconsax-reactjs";

export default function DashboardHeader() {
  const router = useRouter();

  const { avatar } = useUserInfoStore((state) => state);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleNavigateToProfile = () => {
    router.push("/dashboard/profile");
  };

  return (
    <header className="relative h-32 w-full">
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
          src="/images/logo-primary.webp"
          alt="سهمیتو"
          loading="eager"
          fetchPriority="high"
          className="scale-50"
          width={200}
          height={146}
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
              <div className="text-primary flex size-5 items-center justify-center rounded-full bg-white text-lg shadow-lg">
                {"2"}
              </div>
            }
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div className="border-primary flex h-12 w-12 items-center justify-center rounded-full border bg-white">
              <Notification1
                size={24}
                variant="Broken"
                className="text-secondary"
              />
            </div>
          </Badge>
        </div>
      </div>
    </header>
  );
}
