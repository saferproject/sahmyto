import { KarboomsLayoutProps } from "./_types/karbooms-layout-props";
import { ExpenseListStoreProvider } from "./expenses-list/_providers/expense-list-store-provider";
import { IncomeListStoreProvider } from "./incomes-list/_providers/income-list-store-provider";

export default function KarboomsLayout({ children }: KarboomsLayoutProps) {
  return (
    <ExpenseListStoreProvider>
      <IncomeListStoreProvider>
        <div className="flex size-full min-h-0 flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto pt-26 pb-20">
          {children}
        </div>
      </IncomeListStoreProvider>
    </ExpenseListStoreProvider>
  );
}
