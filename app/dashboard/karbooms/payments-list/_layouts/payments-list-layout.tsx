import QueryState from "@/app/_components/query-state";
import { AnimatePresence } from "motion/react";

import SelectedKarboomInfoComponent from "../../_components/selected-karboom-info-component";

import ListFooterLayout from "../../_layouts/list-footer-layout";

import useGetPaymentsEndpoint from "../_hooks/use-get-payments-endpoint";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import { PaymentsListProps } from "../_types/payments-list-props";

export default function PaymentsListLayout({
  onOpenForm,
  onOpenDetails,
}: PaymentsListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const {
    data: payments,
    isLoading: gettingPayments,
    isError: gettingPaymentsFailed,
  } = useGetPaymentsEndpoint(karboomId);

  return (
    <>
      <SelectedKarboomInfoComponent />
      <QueryState
        isLoading={gettingPayments}
        isError={gettingPaymentsFailed}
        isEmpty={!payments?.data.length}
      >
        <ul className="flex w-full flex-col gap-4">
          <AnimatePresence>
            {/* TODO map the payments data and display them here */}
          </AnimatePresence>
        </ul>
      </QueryState>
      <ListFooterLayout onAdd={onOpenForm} />
    </>
  );
}
