import { KarboomsLayoutProps } from "./_types/karbooms-layout-props";
import { ExpenseListStoreProvider } from "./[karboomId]/expenses-list/_providers/expense-list-store-provider";
import { IncomeListStoreProvider } from "./[karboomId]/incomes-list/_providers/income-list-store-provider";

export default function KarboomsLayout({ children }: KarboomsLayoutProps) {
  return (
    <ExpenseListStoreProvider>
      <IncomeListStoreProvider>{children}</IncomeListStoreProvider>
    </ExpenseListStoreProvider>
  );
}
