import { useEffect, useState } from "react";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import MonthListItemComponent from "../_components/month-list-item-component";

import useGetFinancialMonthsEndpoint from "../_hooks/use-get-financial-management-months-endpoint";
import QueryState from "@/app/_components/query-state";

export default function MonthListLayout() {
  const karboomId = useKarboomsStore((state) => state.id);

  const [selectedMonthId, setSelectedMonthId] = useState<null | number>(null);

  const {
    data: financialMonths,
    isSuccess: gotFinancialMonths,
    isError: gettingFinancialMonthsFailed,
    isLoading: gettingFinancialMonths,
  } = useGetFinancialMonthsEndpoint(karboomId);

  const handleSelectMonth = (monthId: number) => {
    setSelectedMonthId(monthId);
  };

  useEffect(() => {
    if (gotFinancialMonths) handleSelectMonth(financialMonths.data[0].id);
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
            selectedMonthId={selectedMonthId}
            onSelectMonth={handleSelectMonth}
            index={index}
          />
        ))}
      </ul>
    </QueryState>
  );
}
