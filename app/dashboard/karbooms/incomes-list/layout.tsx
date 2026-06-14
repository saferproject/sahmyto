import { IncomeListStoreProvider } from "./_providers/income-list-store-provider";

import { IncomeListLayoutProps } from "./_types/income-list-layout-props";

export default function IncomeListLayout({ children }: IncomeListLayoutProps) {
  return <IncomeListStoreProvider>{children}</IncomeListStoreProvider>;
}
