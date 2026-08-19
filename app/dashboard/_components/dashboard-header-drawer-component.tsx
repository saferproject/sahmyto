"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { Button, SwipeableDrawer } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import DashboardHeaderDrawerProps from "../_interfaces/dashboard-header-drawer-props";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";

import { DRAWER_MENU_ITEMS } from "../_constants/drawer-menu-items";
import useUserLogout from "../_hooks/use-user-logout-endpoint";
import { useConfirmationDialogStore } from "../_providers/confirmation-dialog-provider";
import { User, ArrowLeft2, Logout, Add } from "iconsax-reactjs";
import { useState } from "react";
import { useSnackbar } from "notistack";
import PartnerListDrawerComponent from "../karbooms/_components/partner-list-drawer-component";
import DriverListDrawerComponent from "../karbooms/_components/driver-list-drawer-component";

const KarboomFormDrawerComponent = dynamic(
  () => import("../karbooms/_components/karboom-form-drawer-component"),
  { ssr: false },
);
const PartnerFormDrawerComponent = dynamic(
  () => import("../karbooms/_components/partner-form-drawer-component"),
  { ssr: false },
);
const DriverFormDrawerComponent = dynamic(
  () => import("../karbooms/_components/driver-form-drawer-component"),
  { ssr: false },
);

export default function DashboardHeaderDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: DashboardHeaderDrawerProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [isKarboomFormDrawerOpen, setkarboomFormDrawerOpen] = useState(false);
  const [isPartnerListDrawerOpen, setPartnerListDrawerOpen] = useState(false);
  const [isPartnerFormDrawerOpen, setPartnerFormDrawerOpen] = useState(false);
  const [isDriverListDrawerOpen, setDriverListDrawerOpen] = useState(false);
  const [isDriverFormDrawerOpen, setDriverFormDrawerOpen] = useState(false);
  const [loadedDrawers, setLoadedDrawers] = useState({
    karboom: false,
    partnerList: false,
    partnerForm: false,
    driverList: false,
    driverForm: false,
  });

  const avatar = useUserInfoStore((state) => state.avatar);
  const fullName = useUserInfoStore((state) => state.full_name);
  const startPendingConfirmation = useConfirmationDialogStore(
    (state) => state.startPending,
  );
  const stopPendingConfirmation = useConfirmationDialogStore(
    (state) => state.stopPending,
  );
  const setConfirmationDialog = useConfirmationDialogStore(
    (state) => state.setDialog,
  );
  const closeConfirmationDialog = useConfirmationDialogStore(
    (state) => state.closeDialog,
  );

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
    startPendingConfirmation();
    logout(undefined, {
      onSuccess: () => {
        stopPendingConfirmation();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/login");
      },
    });
  };

  const handleConfirmLogout = () => {
    setConfirmationDialog({
      isOpen: true,
      isPending: false,
      title: "خروج از حساب",
      icon: <Logout size="32" className="text-primary rotate-y-180" />,
      mainDiscription: "آیا می خواهید از حساب کاربریتان خارج شوید؟",
      onConfirm: handleLogout,
      onClose: closeConfirmationDialog,
    });
  };

  const handleOpenKarboomFormDrawer = () => {
    setLoadedDrawers((current) => ({ ...current, karboom: true }));
    setkarboomFormDrawerOpen(true);
  };

  const handleCloseKarboomFormDrawer = () => {
    setkarboomFormDrawerOpen(false);
  };

  const handleOpenPartnerListDrawer = () => {
    setLoadedDrawers((current) => ({ ...current, partnerList: true }));
    setPartnerListDrawerOpen(true);
  };

  const handleClosePartnerListDrawer = () => {
    setPartnerListDrawerOpen(false);
  };

  const handleSkipPartnerListDrawer = () => {
    setPartnerListDrawerOpen(false);
    handleOpenDriverListDrawer();
  };

  const handleOpenPartnerFormDrawer = () => {
    setLoadedDrawers((current) => ({ ...current, partnerForm: true }));
    setPartnerFormDrawerOpen(true);
  };

  const handleClosePartnerFormDrawer = () => {
    setPartnerFormDrawerOpen(false);
  };

  const handleOpenDriverListDrawer = () => {
    setLoadedDrawers((current) => ({ ...current, driverList: true }));
    setDriverListDrawerOpen(true);
  };

  const handleCloseDriverListDrawer = () => {
    setDriverListDrawerOpen(false);
  };

  const handleOpenDriverFormDrawer = () => {
    setLoadedDrawers((current) => ({ ...current, driverForm: true }));
    setDriverFormDrawerOpen(true);
  };

  const handleCloseDriverFormDrawer = () => {
    setDriverFormDrawerOpen(false);
  };

  const handleKarboomFormSuccess = () => {
    handleCloseKarboomFormDrawer();
    handleOpenPartnerListDrawer();
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
          },
        },
      }}
    >
      {loadedDrawers.karboom && (
        <KarboomFormDrawerComponent
          isOpen={isKarboomFormDrawerOpen}
          onOpen={handleOpenKarboomFormDrawer}
          onClose={handleCloseKarboomFormDrawer}
          onSuccess={handleKarboomFormSuccess}
        />
      )}
      {loadedDrawers.partnerList && (
        <PartnerListDrawerComponent
          isOpen={isPartnerListDrawerOpen}
          onOpen={handleOpenPartnerListDrawer}
          onClose={handleClosePartnerListDrawer}
          onSkip={handleSkipPartnerListDrawer}
        />
      )}
      {loadedDrawers.driverList && (
        <DriverListDrawerComponent
          isOpen={isDriverListDrawerOpen}
          onOpen={handleOpenDriverListDrawer}
          onClose={handleCloseDriverListDrawer}
        />
      )}
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
            <h3 className="text-body font-semibold">{fullName}</h3>
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
                        "flex cursor-pointer items-center justify-between py-4 " +
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
