import { useEffect } from "react";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import MonthListItemComponent from "../_components/month-list-item-component";

import useGetFinancialMonthsEndpoint from "../_hooks/use-get-financial-management-months-endpoint";

import QueryState from "@/app/_components/query-state";

import { MonthListProps } from "../_types/month-list-props";
import InfiniteScrollTrigger from "@/app/_components/infinite-scroll-trigger";

export default function MonthListLayout({
  selectedMonth,
  onSelectMonth,
}: MonthListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const {
    data: financialMonths,
    isSuccess: gotFinancialMonths,
    isError: gettingFinancialMonthsFailed,
    isLoading: gettingFinancialMonths,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetFinancialMonthsEndpoint(karboomId);

  useEffect(() => {
    const firstMonth = financialMonths?.data[0];

    if (gotFinancialMonths && !selectedMonth && firstMonth) {
      onSelectMonth(firstMonth);
    }
  }, [gotFinancialMonths, financialMonths, onSelectMonth, selectedMonth]);

  return (
    <QueryState
      isLoading={gettingFinancialMonths}
      isError={gettingFinancialMonthsFailed}
      isEmpty={!financialMonths?.data.length}
    >
      <ul
        dir="ltr"
        className="flex min-h-23 w-full snap-x snap-mandatory flex-nowrap items-center gap-4 overflow-x-auto pt-5"
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
        <li className="shrink-0">
          <InfiniteScrollTrigger
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </li>
      </ul>
    </QueryState>
  );
}
