"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Badge, Button, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { ProfileCircle } from "iconsax-reactjs";

import PartnersListItemProps from "../_interfaces/partners-list-item-props";

import getActivityStatusColor from "../_utilities/get-partner-status-color";
import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";

export default function PartnersListItemComponent({
  item: { full_name, phone, avatar, status },
  index,
}: PartnersListItemProps) {
  const menuButton = useRef<HTMLButtonElement>(null);

  const [isOpen, setOpen] = useState(false);

  const handleOpenMenu = () => {
    setOpen(true);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <motion.li
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: status === "pending" ? 0.6 : 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
      transition={{ delay: index * 0.1, duration: 0.2, ease: "easeIn" }}
      className="border-secondary-light w-full overflow-visible rounded-2xl border p-2"
    >
      <Badge
        badgeContent={
          <span
            className={
              "relative left-16 rounded-full p-2 " +
              getActivityStatusColor(status)
            }
          >
            {ACTIVITY_STATUS_FA[status]}
          </span>
        }
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          width: "100%",
        }}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-full">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="عکس شریک"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              ) : (
                <ProfileCircle className="text-heading" size={32} />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-body font-semibold">{full_name}</p>
              <p className="text-body">{phone}</p>
            </div>
          </div>
          <Button ref={menuButton} onClick={handleOpenMenu}>
            عملیات
          </Button>
          <Menu
            anchorEl={menuButton.current}
            open={isOpen}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => {}}>ویرایش</MenuItem>
            <MenuItem onClick={() => {}}>حذف</MenuItem>
          </Menu>
        </div>
      </Badge>
    </motion.li>
  );
}
