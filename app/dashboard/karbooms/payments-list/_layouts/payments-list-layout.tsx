"use client";

import useGetPaymentsEndpoint from "../_hooks/use-get-payments-endpoint";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import { PaymentsListProps } from "../_types/payments-list-props";
import PaymentListItemComponent from "../_components/payment-list-item-component";
import ListHeaderLayout from "../../_layouts/list-header-layout";
import EntityListLayout from "../../_layouts/entity-list-layout";

export default function PaymentsListLayout({
  onOpenForm,
  onOpenDetails,
  onOpenReject,
}: PaymentsListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const {
    data: payments,
    isLoading: gettingPayments,
    isError: gettingPaymentsFailed,
  } = useGetPaymentsEndpoint(karboomId);

  return (
    <EntityListLayout
      items={payments?.data}
      isLoading={gettingPayments}
      isError={gettingPaymentsFailed}
      onAdd={onOpenForm}
      header={<ListHeaderLayout title="لیست دریافتی و پرداختی ها" />}
      renderItem={(payment, index) => (
        <PaymentListItemComponent
          key={payment.id}
          payment={payment}
          index={index}
          onReject={onOpenReject}
          onShowDetails={onOpenDetails}
        />
      )}
    />
  );
}
