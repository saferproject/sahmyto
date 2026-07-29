import QueryState from "@/app/_components/query-state";
import { AnimatePresence } from "motion/react";

import SelectedKarboomInfoComponent from "../../_components/selected-karboom-info-component";

import ListFooterLayout from "../../_layouts/PaymentsListFooterLayout";

import useGetPaymentsEndpoint from "../_hooks/use-get-payments-endpoint";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import { PaymentsListProps } from "../_types/payments-list-props";

export default function PaymentsListLayout({ onOpenForm, onOpenDetails }: PaymentsListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const {
    data: payments,
    isLoading: gettingPayments,
    isError: gettingPaymentsFailed,
  } = useGetPaymentsEndpoint(karboomId);

  return (
    <div className="mt-4 flex min-h-0 w-full flex-1 flex-col gap-4">
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-x-hidden overflow-y-auto pb-2">
        <SelectedKarboomInfoComponent />
        <QueryState
          isLoading={gettingPayments}
          isError={gettingPaymentsFailed}
          isEmpty={!payments?.data.length}
        >
          <ul className="mt-6 flex w-full flex-col gap-4">
            <AnimatePresence>
              {/* TODO map the payments data and display them here */}
            </AnimatePresence>
          </ul>
        </QueryState>
      </div>
      <ListFooterLayout onAdd={onOpenForm} />
    </div>
  );
}
