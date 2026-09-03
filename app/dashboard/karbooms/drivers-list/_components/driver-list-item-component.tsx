"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import { More, User } from "iconsax-reactjs";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";

import { type DriverListItemProps } from "../_types/driver-list-item-props";

import AnimatedListItem from "@/app/_components/animated-list-item-component";
import PriceWithUnit from "@/app/_components/price-with-unit-component";

import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import { ACTIVITY_STATUS_COLORS } from "../../_constants/activity-status-colors";
import { DRIVER_PAYMENT_TYPES_FA } from "../_constants/payment-types-fa";
import useDeleteDriverEndpoint from "../_hooks/use-delete-driver-endpoint";
import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import { useSnackbar } from "notistack";

export default function DriverListItemComponent({
  driver,
  index,
  onEdit,
}: DriverListItemProps) {
  const {
    avatar,
    full_name,
    phone,
    fixed_amount,
    service_amount,
    percentage_amount,
    payment_type,
    membership_status,
  } = driver;

  const { enqueueSnackbar } = useSnackbar();

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const { mutate: deleteDriver } = useDeleteDriverEndpoint();

  const karboomRoles = useKarboomsStore((state) => state.roles);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    onEdit(driver);
  };

  const handleDelete = () => {
    if (karboomRoles.includes("owner")) {
      handleCloseMenu();
      deleteDriver(driver.id);
    } else
      enqueueSnackbar({
        variant: "warning",
        message: "فقط سازنده کاربوم میتواند راننده حذف کند",
      });
  };

  return (
    <AnimatedListItem
      index={index}
      dimmed={membership_status === "pending"}
      className="relative overflow-visible"
    >
      <Badge
        badgeContent={
          <span
            className={
              "relative left-16 rounded-full p-2 " +
              ACTIVITY_STATUS_COLORS[membership_status]
            }
          >
            {ACTIVITY_STATUS_FA[membership_status]}
          </span>
        }
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        sx={{
          width: "100%",
        }}
      >
        <div className="border-secondary-light flex w-full items-center gap-4 overflow-visible rounded-2xl border p-4">
          <div className="border-primary relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border">
            {avatar ? (
              <Image
                src={avatar}
                alt="عکس راننده"
                fill
                className="object-cover"
                sizes="48px"
              />
            ) : (
              <User className="text-secondary-light" />
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex w-full items-center justify-between">
              <p className="text-body text-sm font-semibold">{full_name}</p>
              <p className="text-body text-sm font-semibold">{phone}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-body text-sm font-semibold">
                دستمزد {DRIVER_PAYMENT_TYPES_FA[payment_type]}
              </p>
              <PriceWithUnit
                value={fixed_amount}
                size={20}
                valueClassName="text-body font-semibold"
              />
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-body text-sm font-semibold">دستمزد سرویسی</p>
              <PriceWithUnit
                value={service_amount}
                size={20}
                valueClassName="text-body font-semibold"
              />
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-body text-sm font-semibold">دستمزد درصدی</p>
              <div className="flex items-center gap-2">
                <p className="text-body font-semibold">{percentage_amount}</p>
                <p className="text-primary text-lg font-semibold">%</p>
              </div>
            </div>
          </div>
          <IconButton
            onClick={handleOpenMenu}
            aria-label="عملیات"
            sx={{
              position: "absolute",
              top: 0,
              left: "20px",
            }}
          >
            <More className="text-body" />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleEdit}>ویرایش</MenuItem>
            <MenuItem onClick={handleDelete}>حذف</MenuItem>
          </Menu>
        </div>
      </Badge>
    </AnimatedListItem>
  );
}
