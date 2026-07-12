import { useEffect, useState } from "react";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import MonthListItemComponent from "../_components/month-list-item-component";

import useGetFinancialMonthsEndpoint from "../_hooks/use-get-financial-management-months-endpoint";

import QueryState from "@/app/_components/query-state";

import { MonthListProps } from "../_types/month-list-props";

export default function MonthListLayout({ selectedMonth, onSelectMonth }: MonthListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const {
    data: financialMonths,
    isSuccess: gotFinancialMonths,
    isError: gettingFinancialMonthsFailed,
    isLoading: gettingFinancialMonths,
  } = useGetFinancialMonthsEndpoint(karboomId);

  useEffect(() => {
    if (gotFinancialMonths) onSelectMonth(financialMonths.data[0]);
  }, [gotFinancialMonths, financialMonths]);

  return (
    <QueryState
      isLoading={gettingFinancialMonths}
      isError={gettingFinancialMonthsFailed}
      isEmpty={!financialMonths?.data.length}
    >
      <ul
        dir="ltr"
        className="mt-4 flex w-full snap-x snap-mandatory flex-nowrap items-center gap-4 overflow-x-auto pt-5"
      >
        {financialMonths?.data.map((financialMonth, index) => (
          <MonthListItemComponent
            key={financialMonth.id}
            financialMonth={financialMonth}
            selectedMonth={selectedMonth}
            onSelectMonth={onSelectMonth}
            index={index}
          />
        ))}
      </ul>
    </QueryState>
  );
}
