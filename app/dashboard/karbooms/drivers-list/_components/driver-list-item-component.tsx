import Image from "next/image";
import { User } from "iconsax-reactjs";
import { motion } from "motion/react";
import { Badge } from "@mui/material";

import { type DriverListItemProps } from "../_types/driver-list-item-props";

import formatNumber from "@/app/_utilities/format-numbers";
import formatPaymentType from "../_utilities/format-payment-type";
import getActivityStatusColor from "../../partners-list/_utilities/get-partner-status-color";

import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";

export default function DriverListItemComponent({
  driver: {
    avatar,
    full_name,
    phone,
    fixed_amount,
    percentage_amount,
    payment_type,
    membership_status,
  },
}: DriverListItemProps) {
  return (
    <motion.li
      className={
        "overflow-visible " +
        (membership_status === "pending" ? "opacity-60" : "")
      }
    >
      <Badge
        badgeContent={
          <span
            className={
              "relative left-16 rounded-full p-2 " + 
              getActivityStatusColor(membership_status)
            }
          >
            {ACTIVITY_STATUS_FA[membership_status]}
          </span>
        }
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          width: "100%",
        }}
      >
        <div className="border-secondary-light flex w-full items-center justify-between overflow-visible rounded-2xl border p-4">
          <div className="border-primary relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border">
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
          <div className="flex w-[calc(100%-64px)] flex-col gap-4">
            <div className="flex w-full items-center justify-between">
              <p className="text-body text-sm font-semibold">{full_name}</p>
              <p className="text-body text-sm font-semibold">{phone}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-body text-sm font-semibold">
                حقوق {formatPaymentType(payment_type)}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-body">{formatNumber(fixed_amount)}</p>
                <Image
                  src="/images/toman-primary.webp"
                  alt="تومان"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-body text-sm font-semibold">حقوق درصدی</p>
              <div className="flex items-center gap-2">
                <p>{percentage_amount}</p>
                <p className="text-primary text-lg font-semibold">%</p>
              </div>
            </div>
          </div>
        </div>
      </Badge>
    </motion.li>
  );
}
