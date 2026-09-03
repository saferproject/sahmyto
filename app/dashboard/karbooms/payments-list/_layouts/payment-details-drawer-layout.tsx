"use client";

import { PaymentDetailsDrawerProps } from "../_types/payment-details-drawer-props";
import DetailItemComponent from "@/app/_components/detail-item-component";
import formatDate from "@/app/_utilities/format-dates";
import formatNumber from "@/app/_utilities/format-numbers";
import { usePaymentListStore } from "../_providers/payments-list-store-provider";
import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import { ACTIVITY_STATUS_TEXT_COLORS } from "../../_constants/activity-status-colors";
import { PAYMENT_TYPES_FA } from "../_constants/payment-types-fa";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import useApprovePaymentEndpoint from "../_hooks/use-approve-payment-endpoint";
import EntityDetailsDrawerComponent from "../../_components/entity-details-drawer-component";

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
    created_at,
    status,
    receiver: { id: receiverId, full_name: receiverName },
    payer: { full_name: payerName },
    user: { full_name: submitterName },
    reject_reason,
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
    <EntityDetailsDrawerComponent
      title="جزئیات دریافتی پرداختی"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={handleClose}
      description={description}
      approveConfig={{
        canApprove: status === "pending" && receiverId === loggedInUserId,
        onApprove: handleApprove,
        onReject: onReject,
      }}
    >
      <ul className="mt-4 flex w-full flex-col gap-4 text-sm">
        <DetailItemComponent label="مبلغ" value={formatNumber(total_price)} />
        <DetailItemComponent label="نوع" value={PAYMENT_TYPES_FA[type]} />
        <DetailItemComponent label="تاریخ" value={formatDate(date)} />
        <DetailItemComponent label="تاریخ ثبت" value={formatDate(created_at)} />
        <DetailItemComponent label="ثبت کننده" value={submitterName} />
        <DetailItemComponent label="پرداخت کننده" value={payerName} />
        <DetailItemComponent label="دریافت کننده" value={receiverName} />
        <DetailItemComponent
          label="وضعیت"
          value={ACTIVITY_STATUS_FA[status]}
          valueColor={ACTIVITY_STATUS_TEXT_COLORS[status]}
        />
        {status === "rejected" && (
          <DetailItemComponent label="علت رد" value={reject_reason} />
        )}
      </ul>
    </EntityDetailsDrawerComponent>
  );
}
