"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button, SwipeableDrawer } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import DashboardHeaderDrawerProps from "../_interfaces/dashboard-header-drawer-props";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";

import { DRAWER_MENU_ITEMS } from "../_constants/drawer-menu-items";
import useUserLogout from "../_hooks/use-user-logout-endpoint";
import { useConfirmationDialogStore } from "../_providers/confirmation-dialog-provider";
import { User, ArrowLeft2, Logout } from "iconsax-reactjs";
import KarboomFormDrawerComponent from "../karbooms/_components/karboom-form-drawer-component";
import { useState } from "react";

export default function DashboardHeaderDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: DashboardHeaderDrawerProps) {
  const router = useRouter();

  const [isKarboomFormDrawerOpen, setkarboomFormDrawerOpen] = useState(false);

  const { avatar, full_name } = useUserInfoStore((state) => state);
  const {
    setDialog: setConfirmationDialog,
    closeDialog: closeConfirmationDialog,
  } = useConfirmationDialogStore((state) => state);

  const { mutate } = useUserLogout();

  const handleNavigation = (link: string) => {
    router.push(link);
    onClose();
  };

  const handleNavigationToProfile = () => {
    router.push("/dashboard/profile");
    onClose();
  };

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/login");
      },
    });
  };

  const handleConfirmLogout = () => {
    setConfirmationDialog({
      isOpen: true,
      title: "خروج از حساب",
      icon: <Logout size="32" className="text-primary rotate-y-180" />,
      mainDiscription: "آیا می خواهید از حساب کاربریتان خارج شوید؟",
      onConfirm: handleLogout,
      onClose: closeConfirmationDialog,
    });
  };

  const handleOpenKarboomFormDrawer = () => {
    setkarboomFormDrawerOpen(true);
  };

  const handleCloseKarboomFormDrawer = () => {
    setkarboomFormDrawerOpen(false);
  };

  const handleAddKarboomSuccess = () => {
    handleCloseKarboomFormDrawer();
    onClose();
  }

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
      <KarboomFormDrawerComponent
        isOpen={isKarboomFormDrawerOpen}
        onOpen={handleOpenKarboomFormDrawer}
        onClose={handleCloseKarboomFormDrawer}
        onSuccess={handleAddKarboomSuccess}
      />
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-l-3xl bg-white p-8 shadow-lg">
        <div className="flex w-full items-center justify-between">
          <Image
            src="/images/logo-secondary.svg"
            alt="سهمیتو"
            className="scale-75"
            width={128}
            height={64}
          />
          <p className="text-body text-xs font-semibold">یه سهم من یه سهم تو</p>
        </div>
        {isOpen && (
          <motion.button
            initial={{ scale: 0.7, opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: 0.2,
              duration: 0.2,
              ease: "easeOut",
            }}
            type="button"
            aria-label="پروفایل"
            className="mt-4 flex w-full flex-col items-center gap-2"
            onClick={handleNavigationToProfile}
          >
            <div className="border-primary relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 object-cover">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="عکس پروفایل"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <User size={48} className="text-secondary" />
              )}
            </div>
            <h3 className="text-body font-semibold">{full_name}</h3>
          </motion.button>
        )}
        <nav className="mt-6 min-h-0 flex-1 overflow-y-auto pl-2">
          <Button
            variant="contained"
            sx={{
              marginBottom: "8px",
            }}
            onClick={handleOpenKarboomFormDrawer}
            fullWidth
          >
            ایجاد کاربوم
          </Button>
          <ul className="flex flex-col">
            <AnimatePresence>
              {isOpen &&
                DRAWER_MENU_ITEMS.map(({ id, title, icon, link }, index) => (
                  <motion.li
                    initial={{ x: 320 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      x: 0,
                    }}
                    transition={{
                      delay: 0.2 + 0.1 * index,
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    key={id}
                    role="button"
                    tabIndex={0}
                    className="text-body flex items-center justify-between py-4"
                    onClick={() => handleNavigation(link)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ")
                        handleNavigation(link);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {icon} <h4 className="text-sm font-semibold">{title}</h4>
                    </div>
                    <ArrowLeft2 size={24} />
                  </motion.li>
                ))}
            </AnimatePresence>
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
