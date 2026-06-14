import { ExpenseListStoreProvider } from "./_providers/expense-list-store-provider";

import { ExpenseListLayoutProps } from "./_types/expense-list-layout-props";

export default function ExpenseListLayout({
  children,
}: ExpenseListLayoutProps) {
  return <ExpenseListStoreProvider>{children}</ExpenseListStoreProvider>;
}
