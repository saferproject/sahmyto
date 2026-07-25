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
import { User, ArrowLeft2, Logout, Add } from "iconsax-reactjs";
import KarboomFormDrawerComponent from "../karbooms/_components/karboom-form-drawer-component";
import { useState } from "react";
import { useSnackbar } from "notistack";
import PartnerFormDrawerComponent from "../karbooms/_components/partner-form-drawer-component";
import DriverFormDrawerComponent from "../karbooms/_components/driver-form-drawer-component";

export default function DashboardHeaderDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: DashboardHeaderDrawerProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [isKarboomFormDrawerOpen, setkarboomFormDrawerOpen] = useState(false);
  const [isPartnerFormDrawerOpen, setPartnerFormDrawerOpen] = useState(false);
  const [isDriverFormDrawerOpen, setDriverFormDrawerOpen] = useState(false);

  const { avatar, full_name } = useUserInfoStore((state) => state);
  const {
    setDialog: setConfirmationDialog,
    closeDialog: closeConfirmationDialog,
  } = useConfirmationDialogStore((state) => state);

  const { mutate: logout } = useUserLogout();

  const handleNavigation = (link: string, disabled: boolean) => {
    if (!disabled) {
      router.push(link);
      onClose();
    } else
      enqueueSnackbar({ variant: "info", message: "صفحه درحال توسعه است" });
  };

  const handleNavigationToProfile = () => {
    router.push("/dashboard/profile");
    onClose();
  };

  const handleLogout = () => {
    logout(undefined, {
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

  const handleOpenPartnerFormDrawer = () => {
    setPartnerFormDrawerOpen(true);
  };

  const handleClosePartnerFormDrawer = () => {
    setPartnerFormDrawerOpen(false);
  };

  const handleOpenDriverFormDrawer = () => {
    setDriverFormDrawerOpen(true);
  };

  const handleCloseDriverFormDrawer = () => {
    setDriverFormDrawerOpen(false);
  };

  const handleKarboomFormSuccess = () => {
    handleCloseKarboomFormDrawer();
    handleOpenPartnerFormDrawer();
  };

  const handlePartnerFormSuccess = () => {
    handleClosePartnerFormDrawer();
    handleOpenDriverFormDrawer();
  };

  const handleDriverFormSuccess = () => {
    handleCloseDriverFormDrawer();
    handleNavigation("/dashboard/karbooms", false);
  };

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
            borderRadius: "0 50px 50px 0",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#e66203",
            paddingBottom: "12px",
            // paddingRight: "4px",
            // paddingTop: "4px",
          },
        },
      }}
    >
      <KarboomFormDrawerComponent
        isOpen={isKarboomFormDrawerOpen}
        onOpen={handleOpenKarboomFormDrawer}
        onClose={handleCloseKarboomFormDrawer}
        onSuccess={handleKarboomFormSuccess}
      />
      <PartnerFormDrawerComponent
        isOpen={isPartnerFormDrawerOpen}
        onOpen={handleOpenPartnerFormDrawer}
        onClose={handleClosePartnerFormDrawer}
        onSuccess={handlePartnerFormSuccess}
      />
      <DriverFormDrawerComponent
        isOpen={isDriverFormDrawerOpen}
        onOpen={handleOpenDriverFormDrawer}
        onClose={handleCloseDriverFormDrawer}
        onSuccess={handleDriverFormSuccess}
      />
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-l-[50px] bg-white p-8 shadow-lg">
        <div className="flex w-full items-center justify-between">
          <Image
            src="/images/logo-secondary.svg"
            alt="سهمیتو"
            className="origin-right scale-65"
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
              justifyContent: "space-between",
            }}
            onClick={handleOpenKarboomFormDrawer}
            startIcon={<Add size={20} className="text-white" />}
            endIcon={<div className="w-5"></div>}
            fullWidth
          >
            ایجاد کاربوم
          </Button>
          <ul className="mt-4 flex flex-col">
            <AnimatePresence>
              {isOpen &&
                DRAWER_MENU_ITEMS.map(
                  ({ id, title, icon, link, disabled }, index) => (
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
                      className={
                        "flex items-center justify-between py-4 " +
                        (disabled ? "text-secondary" : "text-body")
                      }
                      onClick={() => handleNavigation(link, disabled)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ")
                          handleNavigation(link, disabled);
                      }}
                    >
                      <div className="flex items-center gap-4">
                        {icon}{" "}
                        <h4 className="text-sm font-semibold">{title}</h4>
                      </div>
                      <ArrowLeft2 size={20} />
                    </motion.li>
                  ),
                )}
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
