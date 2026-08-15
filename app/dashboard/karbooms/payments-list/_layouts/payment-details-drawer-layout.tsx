import { Button, SwipeableDrawer } from "@mui/material";
import { PaymentDetailsDrawerProps } from "../_types/payment-details-drawer-props";
import DetailItemComponent from "../../incomes-list/_components/income-detail-item-component";
import dayjs from "dayjs";
import formatNumber from "@/app/_utilities/format-numbers";
import { usePaymentListStore } from "../_providers/payments-list-store-provider";
import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import { ACTIVITY_STATUS_TEXT_COLORS } from "../../incomes-list/_constants/income-status-colors";
import { PAYMENT_TYPES_FA } from "../_constants/payment-types-fa";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import useApprovePaymentEndpoint from "../_hooks/use-approve-payment-endpoint";

export default function PaymentDetailsDrawerLayout({
  isOpen,
  onOpen,
  onClose,
  onReject,
}: PaymentDetailsDrawerProps) {
  const {
    id,
    total_price,
    type,
    description,
    date,
    status,
    receiver: { id: receiverId, full_name: receiverName },
    payer: { full_name: payerName },
    user: { full_name: submitterName },
    clearActivePayment,
  } = usePaymentListStore((state) => state);

  const loggedInUserId = useUserInfoStore((state) => state.id);

  const { mutate: approvePayment } = useApprovePaymentEndpoint();

  const handleApprove = () => {
    approvePayment(id);
  };

  const handleClose = () => {
    clearActivePayment();
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
        <div className="bg-secondary-light absolute top-6 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full"></div>
        <div className="flex min-h-0 w-full flex-1 flex-col items-center overflow-y-auto">
          <h4 className="text-body mt-4 font-semibold">جزئیات دریافتی پرداختی</h4>
          <ul className="mt-4 flex w-full flex-col gap-4 text-sm">
            <DetailItemComponent
              label="مبلغ"
              value={formatNumber(total_price)}
            />
            <DetailItemComponent label="نوع" value={PAYMENT_TYPES_FA[type]} />
            <DetailItemComponent
              label="تاریخ"
              value={dayjs(date).format("YYYY/MM/DD")}
            />
            <DetailItemComponent label="ثبت کننده" value={submitterName} />
            <DetailItemComponent label="پرداخت کننده" value={payerName} />
            <DetailItemComponent label="دریافت کننده" value={receiverName} />
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
          {status === "pending" && receiverId == loggedInUserId && (
            <div className="flex w-full items-center gap-4 py-2">
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={onReject}
                fullWidth
              >
                رد
              </Button>
              <Button
                variant="outlined"
                color="success"
                size="small"
                onClick={handleApprove}
                fullWidth
              >
                تایید
              </Button>
            </div>
          )}
        </div>
      </div>
    </SwipeableDrawer>
  );
}
