import Image from "next/image";

import { SwipeableDrawer } from "@mui/material";
import { User } from "iconsax-reactjs";
import dayjs from "dayjs";

import { ExpenseDetailsDrawerProps } from "../_types/expense-details-drawer-props";

import { useExpenseListStore } from "../_providers/expense-list-store-provider";

import formatNumber from "@/app/_utilities/format-numbers";

import DetailItemComponent from "../../incomes-list/_components/income-detail-item-component";

import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import {
  ACTIVITY_STATUS_BG_COLORS,
  ACTIVITY_STATUS_TEXT_COLORS,
} from "../../incomes-list/_constants/income-status-colors";
import ApprovalItemComponent from "../../_components/approval-item-component";

export default function ExpenseDetailsDrawerLayout({
  isOpen,
  onOpen,
  onClose,
}: ExpenseDetailsDrawerProps) {
  const {
    unit_price,
    wage_cost,
    category,
    type,
    date,
    status,
    description,
    payer: { full_name: receiverName },
    sender: { full_name: submitterName },
    approvals,
    clearActiveExpense,
  } = useExpenseListStore((state) => state);

  const handleClose = () => {
    clearActiveExpense();
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
        <div className="flex min-h-0 w-full flex-1 flex-col items-center overflow-y-auto">
          <h4 className="text-body mt-4 font-semibold">جزئیات هزینه</h4>
          <ul className="mt-4 flex w-full flex-col gap-4 text-sm">
            <DetailItemComponent
              label="مبلغ"
              value={formatNumber(unit_price + wage_cost)}
            />
            {type === "repair" && (
              <>
                <DetailItemComponent
                  label="قیمت قطعات"
                  value={formatNumber(unit_price)}
                />
                <DetailItemComponent
                  label="اجرت"
                  value={formatNumber(wage_cost)}
                />
              </>
            )}
            <DetailItemComponent label="دسته هزینه" value={category} />
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
              {approvals.map((approval) => (
                <ApprovalItemComponent key={approval.id} approval={approval} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
