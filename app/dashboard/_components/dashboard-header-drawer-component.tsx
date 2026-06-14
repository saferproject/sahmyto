"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button, SwipeableDrawer } from "@mui/material";
import { AltArrowLeft, Logout } from "@solar-icons/react";
import { motion } from "motion/react";

import DashboardHeaderDrawerProps from "../_interfaces/dashboard-header-drawer-props";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";

import { DRAWER_MENU_ITEMS } from "../_constants/drawer-menu-items";
import useUserLogout from "../_hooks/use-user-logout-endpoint";
import { useEffect } from "react";
import { useConfirmationDialogStore } from "../_providers/confirmation-dialog-provider";
import { User } from "iconsax-reactjs";

export default function DashboardHeaderDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: DashboardHeaderDrawerProps) {
  const router = useRouter();

  const { avatar, full_name } = useUserInfoStore((state) => state);
  const {
    setDialog: setConfirmationDialog,
    closeDialog: closeConfirmationDialog,
  } = useConfirmationDialogStore((state) => state);

  const { mutate, isSuccess } = useUserLogout();

  const handleNavigation = (link: string) => {
    router.push(link);
    onClose();
  };

  const handleNavigationToProfile = () => {
    router.push("/dashboard/profile");
    onClose();
  };

  // TODO refactor entire component using SOLID

  const logout = () => {
    mutate();
  };

  const handleConfirmLogout = () => {
    setConfirmationDialog({
      isOpen: true,
      title: "خروج از حساب",
      icon: <Logout size="32" className="text-primary rotate-y-180" />,
      mainDiscription: "آیا می خواهید از حساب کاربریتان خارج شوید؟",
      onConfirm: logout,
      onClose: closeConfirmationDialog,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [isSuccess]);

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            position: "relative",
            width: "90%",
            borderRadius: "0 24px 24px 0",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#e66203",
            paddingBottom: "12px",
            paddingRight: "4px",
            paddingTop: "4px",
          },
        },
      }}
    >
      <div className="h-[calc(100%-50px)] w-full overflow-hidden rounded-l-3xl bg-white p-8 shadow-lg">
        <div className="bg-secondary-light absolute top-1/2 left-2 h-32 w-2 -translate-y-1/2 rounded-full"></div>
        <div className="flex w-full items-center justify-between">
          <Image
            src="/images/logo-secondary.webp"
            alt="سهمیتو"
            className="scale-75"
            width={128}
            height={64}
          />
          <p className="text-body text-sm font-semibold">یه سهم من یه سهم تو</p>
        </div>
        <div
          className="mt-4 flex w-full flex-col items-center gap-2"
          onClick={handleNavigationToProfile}
        >
          <div className="border-secondary flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border object-cover">
            {avatar ? (
              <img src={avatar} alt="عکس پروفایل" className="h-auto w-full" />
            ) : (
              <User size={48} className="text-secondary" />
            )}
          </div>
          <h3 className="text-body font-semibold">{full_name}</h3>
        </div>
        <nav className="mt-8 h-[calc(100%-150px)] overflow-y-auto pl-2">
          <ul>
            {isOpen &&
              DRAWER_MENU_ITEMS.map(({ id, title, icon, link }, index) => (
                <motion.li
                  initial={{ x: 320 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    x: 0,
                  }}
                  exit={{ x: 320 }}
                  transition={{
                    delay: 0.1 * index,
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  key={id}
                  className="text-body flex items-center justify-between py-4"
                  onClick={() => handleNavigation(link)}
                >
                  <div className="flex items-center gap-4">
                    {icon} <h4 className="font-semibold">{title}</h4>
                  </div>
                  <AltArrowLeft size={24} />
                </motion.li>
              ))}
          </ul>
        </nav>
      </div>
      <Button
        className="text-white!"
        endIcon={<Logout size={24} className="rotate-y-180" />}
        onClick={handleConfirmLogout}
      >
        خروج از سهمیتو
      </Button>
    </SwipeableDrawer>
  );
}
