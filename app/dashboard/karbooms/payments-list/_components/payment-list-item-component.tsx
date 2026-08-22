import { Button } from "@mui/material";

import AnimatedListItem from "@/app/_components/animated-list-item-component";
import PriceWithUnit from "@/app/_components/price-with-unit-component";
import formatDate from "@/app/_utilities/format-dates";

import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import { PaymentListItemProps } from "../_types/payment-list-item-props";
import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import { usePaymentListStore } from "../_providers/payments-list-store-provider";
import useApprovePaymentEndpoint from "../_hooks/use-approve-payment-endpoint";
import DetailItemComponent from "../../incomes-list/_components/income-detail-item-component";
import { PAYMENT_TYPES_FA } from "../_constants/payment-types-fa";
import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import { ACTIVITY_STATUS_TEXT_COLORS } from "../../incomes-list/_constants/income-status-colors";

export default function PaymentListItemComponent({
  payment,
  index,
  onShowDetails,
  onReject,
}: PaymentListItemProps) {
  const {
    id,
    approvals,
    total_price,
    date,
    type,
    status,
    user: { first_name: submitterName },
    payer: { full_name: payerName },
    receiver: { id: receiverId, full_name: receiverName },
  } = payment;

  const loggedInUserId = useUserInfoStore((state) => state.id);

  const userKarboomRoles = useKarboomsStore((state) => state.roles);

  const setActivePayment = usePaymentListStore(
    (state) => state.setActivePayment,
  );

  const { mutate: approvePayment } = useApprovePaymentEndpoint();

  const handleApprove = () => {
    approvePayment(id);
  };

  const handleReject = () => {
    setActivePayment(payment);
    onReject();
  };

  const handleShowDetails = () => {
    setActivePayment(payment);
    onShowDetails();
  };

  return (
    <AnimatedListItem
      index={index}
      className="border-secondary-lighter w-full rounded-2xl border"
    >
      <div className="bg-secondary-lightest relative flex w-full items-center justify-between rounded-2xl p-4">
        <div className="border-body absolute top-1/2 left-1/2 w-8/10 -translate-x-1/2 border-t border-dashed"></div>
        <div className="absolute top-1/4 left-1/2 flex -translate-x-1/2 items-center gap-2">
          <PriceWithUnit
            value={total_price}
            variant="secondary"
            size={16}
            valueClassName="text-body text-sm"
          />
        </div>
        <div className="bg-secondary-lightest z-10 flex flex-col items-center gap-2 p-1">
          <p className="text-secondary text-xs">پرداخت کننده</p>
          <p className="text-body text-sm font-semibold">{payerName}</p>
        </div>
        <div className="bg-secondary-lightest z-10 flex flex-col items-center gap-2 p-1">
          <p className="text-secondary text-xs">دریافت کننده</p>
          <p className="text-body text-sm font-semibold">{receiverName}</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 px-4 py-2">
        <DetailItemComponent label="ثبت کننده" value={submitterName} />
        <DetailItemComponent
          label="تاریخ"
          value={formatDate(date)}
        />
        <DetailItemComponent label="روش واریز" value={PAYMENT_TYPES_FA[type]} />
        <DetailItemComponent
          label="وضعیت"
          value={ACTIVITY_STATUS_FA[status]}
          valueColor={ACTIVITY_STATUS_TEXT_COLORS[status]}
        />
        <Button
          variant="contained"
          size="small"
          onClick={handleShowDetails}
          fullWidth
        >
          نمایش جزئیات
        </Button>
      </div>
      {status === "pending" && receiverId == loggedInUserId && (
        <div className="flex items-center gap-4 px-4 py-2">
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleReject}
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
    </AnimatedListItem>
  );
}
