"use client";

import Image from "next/image";

import { Badge, Button } from "@mui/material";
import { motion } from "motion/react";
import { NotificationBing, Truck, ArrowLeft } from "iconsax-reactjs";

import KarboomListItemProps from "../_types/karboom-list-item-props";

import Plate from "@/app/_components/plate";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

export default function KarboomListItemComponent(
  karboom: KarboomListItemProps,
) {
  const { index, name, plate, image } = karboom;

  const {
    setActiveKarboom,
    openKarboomActionDrawer,
    openIncomeDrawer,
    openExpenseDrawer,
  } = useKarboomsStore((state) => state);

  const handleShowActions = () => {
    setActiveKarboom(karboom);
    openKarboomActionDrawer();
  };

  const handleAddIncome = () => {
    setActiveKarboom(karboom);
    openIncomeDrawer();
  };

  const handleAddExpense = () => {
    setActiveKarboom(karboom);
    openExpenseDrawer();
  };

  return (
    <motion.li
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{ scale: 0.7, opacity: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.2,
        ease: "easeIn",
      }}
      className="bg-secondary relative flex w-full flex-col rounded-3xl shadow-lg"
    >
      <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-t-3xl object-cover">
        <Image
          src={image ?? "/images/truck.webp"}
          alt="عکس کاربوم"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {plate.first_number &&
          plate.second_character &&
          plate.third_number &&
          plate.fourth_number && (
            <div className="absolute left-4">
              <Plate {...plate} />
            </div>
          )}
      </div>
      <div className="relative -top-4 flex w-full flex-col gap-4 rounded-3xl bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-body font-semibold">{name}</p>
          <Badge
            badgeContent={3}
            color="primary"
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <NotificationBing
              size="32"
              className="bg-secondary border-secondary-lighter h-8 w-8 rounded-full border p-1 text-white"
            />
          </Badge>
        </div>
        <div className="grid w-full grid-cols-2 grid-rows-2 gap-2">
          <Button
            variant="outlined"
            color="secondary"
            className="text-body!"
            onClick={handleAddIncome}
          >
            ثبت درآمد
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className="text-body!"
            onClick={handleAddExpense}
          >
            ثبت هزینه
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className="text-body!"
            // onClick={onCreateMaintenance}
          >
            ثبت تعمیر
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className="text-body!"
            // onClick={onCreateTransfer}
          >
            ثبت پرداختی
          </Button>
        </div>
        <Button
          color="primary"
          variant="contained"
          size="large"
          startIcon={<span className="w-6" />}
          endIcon={<ArrowLeft size={24} />}
          onClick={handleShowActions}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          fullWidth
        >
          عملیات
        </Button>
      </div>
      <div className="w-full px-7">
        <Button
          startIcon={<span className="w-6" />}
          endIcon={<ArrowLeft size={24} />}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "#162864",
            fontWeight: "semibold",
            position: "relative",
            bottom: "8px",
          }}
          fullWidth
        >
          مدیریت مالی
        </Button>
      </div>
    </motion.li>
  );
}
