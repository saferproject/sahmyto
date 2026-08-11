"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import { More, User } from "iconsax-reactjs";
import { motion } from "motion/react";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";

import { type DriverListItemProps } from "../_types/driver-list-item-props";

import formatNumber from "@/app/_utilities/format-numbers";

import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import { ACTIVITY_STATUS_COLORS } from "../../_constants/activity-status-colors";
import { DRIVER_PAYMENT_TYPES_FA } from "../_constants/payment-types-fa";
import useDeleteDriverEndpoint from "../_hooks/use-delete-driver-endpoint";

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
  const { mutate: deleteDriver } = useDeleteDriverEndpoint();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

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
    handleCloseMenu();
    deleteDriver(driver.id);
  };

  return (
    <motion.li
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: membership_status === "pending" ? 0.6 : 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
      transition={{ delay: index * 0.1, duration: 0.2, ease: "easeIn" }}
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
              <div className="flex items-center gap-2">
                <p className="text-body font-semibold">
                  {formatNumber(fixed_amount)}
                </p>
                <Image
                  src="/images/toman-primary.webp"
                  alt="تومان"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-body text-sm font-semibold">دستمزد سرویسی</p>
              <div className="flex items-center gap-2">
                <p className="text-body font-semibold">
                  {formatNumber(service_amount)}
                </p>
                <Image
                  src="/images/toman-primary.webp"
                  alt="تومان"
                  width={20}
                  height={20}
                />
              </div>
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
    </motion.li>
  );
}
