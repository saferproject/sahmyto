"use client";

import Image from "next/image";
import { Badge, Button, Menu, MenuItem } from "@mui/material";
import { useState, type MouseEvent } from "react";
import { ProfileCircle } from "iconsax-reactjs";

import AnimatedListItem from "@/app/_components/animated-list-item-component";
import PartnersListItemProps from "../_interfaces/partners-list-item-props";
import useDeletePartnerEndpoint from "../_hooks/use-delete-partner-endpoint";

import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import { ACTIVITY_STATUS_COLORS } from "../../_constants/activity-status-colors";
import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import { useSnackbar } from "notistack";

export default function PartnersListItemComponent({
  item,
  index,
  onEdit,
}: PartnersListItemProps) {
  const { full_name, phone, avatar, share, status } = item;

  const { enqueueSnackbar } = useSnackbar();

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const karboomRoles = useKarboomsStore((state) => state.roles);

  const { mutate: deletePartner } = useDeletePartnerEndpoint();

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    onEdit(item);
  };

  const handleDelete = () => {
    if (karboomRoles.includes("owner")) {
      handleCloseMenu();
      deletePartner(item.id);
    } else
      enqueueSnackbar({
        variant: "warning",
        message: "فقط سازنده کاربوم میتواند مالک حذف کند",
      });
  };

  return (
    <AnimatedListItem
      index={index}
      dimmed={status === "pending"}
      className="border-secondary-light w-full overflow-visible rounded-2xl border p-2"
    >
      <Badge
        badgeContent={
          <span
            className={
              "relative -top-2 left-16 rounded-full p-2 " +
              ACTIVITY_STATUS_COLORS[status]
            }
          >
            {ACTIVITY_STATUS_FA[status]}
          </span>
        }
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
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
                  alt="عکس مالک"
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
              <p className="text-body">{share} دانگ</p>
            </div>
          </div>
          <Button onClick={handleOpenMenu}>عملیات</Button>
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
