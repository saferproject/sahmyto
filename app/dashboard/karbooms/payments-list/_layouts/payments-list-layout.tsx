import QueryState from "@/app/_components/query-state";
import { AnimatePresence } from "motion/react";

import SelectedKarboomInfoComponent from "../../_components/selected-karboom-info-component";

import ListFooterLayout from "../../_layouts/list-footer-layout";

import useGetPaymentsEndpoint from "../_hooks/use-get-payments-endpoint";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import { PaymentsListProps } from "../_types/payments-list-props";
import PaymentListItemComponent from "../_components/payment-list-item-component";
import ListHeaderLayout from "../../_layouts/list-header-layout";

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
    <>
      <ListHeaderLayout title="لیست دریافتی و پرداختی ها" />
      <SelectedKarboomInfoComponent />
      <QueryState
        isLoading={gettingPayments}
        isError={gettingPaymentsFailed}
        isEmpty={!payments?.data.length}
      >
        <ul className="flex w-full flex-col gap-4">
          <AnimatePresence>
            {payments?.data.map((payment, index) => (
              <PaymentListItemComponent
                key={payment.id}
                payment={payment}
                index={index}
                onReject={onOpenReject}
                onShowDetails={onOpenDetails}
              />
            ))}
          </AnimatePresence>
        </ul>
      </QueryState>
      <ListFooterLayout onAdd={onOpenForm} />
    </>
  );
}
