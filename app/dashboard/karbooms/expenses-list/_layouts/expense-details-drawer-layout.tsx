import Image from "next/image";

import { useSnackbar } from "notistack";
import { SwipeableDrawer } from "@mui/material";
import { User } from "iconsax-reactjs";
import dayjs from "dayjs";

import { ExpenseDetailsDrawerProps } from "../_types/expense-details-drawer-props";

import { useExpenseListStore } from "../_providers/expense-list-store-provider";

import formatNumber from "@/app/_utilities/format-numbers";

import DetailItemComponent from "../../incomes-list/_components/income-detail-item-component";

import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import { ACTIVITY_STATUS_COLORS } from "../../incomes-list/_constants/income-status-colors";

export default function ExpenseDetailsDrawerLayout({
  isOpen,
  onOpen,
  onClose,
}: ExpenseDetailsDrawerProps) {
  const { enqueueSnackbar } = useSnackbar();

  const {
    id,
    unit_price,
    wage_cost,
    category,
    date,
    status,
    description,
    payer: { full_name: receiverName },
    sender: { full_name: submitterName },
    approvals,
  } = useExpenseListStore((state) => state);

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
      <div className="relative h-120 w-full px-8 py-12">
        <div className="bg-secondary-light absolute top-6 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full"></div>
        <div className="flex h-full w-full flex-col items-center justify-between overflow-y-auto">
          <h4 className="text-body mt-4 font-semibold">جزئیات درآمد</h4>
          <ul className="mt-4 flex w-full flex-col gap-4 text-sm">
            <DetailItemComponent
              label="مبلغ"
              value={formatNumber(unit_price + wage_cost)}
            />
            <DetailItemComponent label="نوع هزینه" value={category} />
            <DetailItemComponent
              label="تاریخ"
              value={dayjs(date).format("YYYY/MM/DD")}
            />
            <DetailItemComponent
              label="پرداخت کننده"
              value={receiverName ?? ""}
            />
            <DetailItemComponent
              label="ثبت کننده"
              value={submitterName ?? ""}
            />
            <DetailItemComponent
              label="وضعیت"
              value={ACTIVITY_STATUS_FA[status]}
              valueColor={ACTIVITY_STATUS_COLORS[status]}
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
                ({
                  id,
                  status,
                  reject_reason,
                  user: { full_name, avatar, phone },
                }) => (
                  <li
                    key={id}
                    className="border-secondary flex w-full flex-col gap-4 rounded-2xl border border-dashed p-4 text-sm"
                  >
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
                        <div className="flex flex-col gap-1">
                          <p className="text-body">{full_name}</p>
                          <p className="text-xs text-body-light">{phone}</p>
                        </div>
                      </div>
                      <p
                        className={`rounded-full px-4 py-2 font-semibold text-white bg-${ACTIVITY_STATUS_COLORS[status]}`}
                      >
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
