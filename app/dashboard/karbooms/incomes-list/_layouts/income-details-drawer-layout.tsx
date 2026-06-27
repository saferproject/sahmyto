"use client";

import Image from "next/image";

import { SwipeableDrawer } from "@mui/material";

import { IncomeDetailsDrawerProps } from "../_types/income-details-drawer-props";

import { useIncomeListStore } from "../_providers/income-list-store-provider";
import formatNumber from "@/app/_utilities/format-numbers";
import { INCOME_TYPES_FA } from "../../_constants/income-types-fa";
import dayjs from "dayjs";
import { ACTIVITY_STATUS_TEXT_COLORS } from "../_constants/income-status-colors";
import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import DetailItemComponent from "../_components/income-detail-item-component";
import { User } from "iconsax-reactjs";

export default function IncomeDetailsDrawerLayout({
  isOpen,
  onOpen,
  onClose,
}: IncomeDetailsDrawerProps) {
  const {
    unit_price,
    quantity,
    type,
    started_at,
    ended_at,
    status,
    description,
    receiver: { full_name: receiverName },
    sender: { full_name: submitterName },
    approvals,
  } = useIncomeListStore((state) => state);

  const handleClose = () => {
    // TODO remove active income from store
    onClose();
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onOpen={onOpen}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            borderRadius: "32px 32px 0 0",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
          },
        },
      }}
    >
      <div className="relative flex max-h-[90dvh] w-full flex-col px-8 py-12">
        <div className="bg-secondary-light absolute top-6 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full"></div>
        <div className="flex w-full min-h-0 flex-1 flex-col items-center overflow-y-auto">
          <h4 className="text-body mt-4 font-semibold">جزئیات درآمد</h4>
          <ul className="mt-4 flex w-full flex-col gap-4 text-sm">
            <DetailItemComponent
              label="مبلغ"
              value={formatNumber(unit_price * quantity)}
            />
            <DetailItemComponent
              label="نوع کارکرد"
              value={INCOME_TYPES_FA[type]}
            />
            <DetailItemComponent
              label="تاریخ / زمان شروع"
              value={dayjs(started_at).format("YYYY/MM/DD")}
            />
            <DetailItemComponent
              label="تاریخ / زمان پایان"
              value={dayjs(ended_at).format("YYYY/MM/DD")}
            />
            <DetailItemComponent label="دریافت کننده" value={receiverName} />
            <DetailItemComponent label="ثبت کننده" value={submitterName} />
            <DetailItemComponent
              label="وضعیت"
              value={ACTIVITY_STATUS_FA[status]}
              valueColor={ACTIVITY_STATUS_TEXT_COLORS[status]}
            />
          </ul>
          {description && (
            <div className="border-secondary mt-4 flex w-full flex-col gap-2 rounded-2xl border border-dashed p-2">
              <p className="text-body-light text-sm">توضیحات ثبت کننده</p>
              <p className="text-body text-sm">{description}</p>
            </div>
          )}
          <div className="mt-4 w-full">
            <h5 className="text-body">وضعیت تاییدیه شرکا</h5>
            <ul className="mt-4 flex w-full flex-col gap-4">
              {approvals.map(
                ({ status, reject_reason, user: { full_name, avatar } }) => (
                  <li className="border-secondary flex w-full flex-col gap-8 rounded-2xl border border-dashed p-4 text-sm">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="border-primary flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border">
                          {/* @ts-ignore */}
                          {avatar ? (
                            <Image
                              src={avatar}
                              alt="عکس شریک"
                              width={48}
                              height={48}
                            />
                          ) : (
                            <User size={32} className="text-secondary" />
                          )}
                        </div>
                        <p>{full_name}</p>
                      </div>
                      <p className={ACTIVITY_STATUS_TEXT_COLORS[status]}>
                        {ACTIVITY_STATUS_FA[status]}
                      </p>
                    </div>
                    {status === "rejected" && reject_reason && (
                      <p className="text-body bg-secondary-lightest w-full rounded-2xl p-2">
                        <span>علت عدم تایید: </span>
                        {reject_reason}
                      </p>
                    )}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
