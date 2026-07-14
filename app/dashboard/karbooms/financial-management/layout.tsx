import { FinancialMonthStoreProvider } from "./_providers/financial-managment-store-provider";
import { FinancialManagementLayoutProps } from "./_types/financial-management-layout-props";

export default function FinancialManagementLayout({
  children,
}: FinancialManagementLayoutProps) {
  return <FinancialMonthStoreProvider>{children}</FinancialMonthStoreProvider>;
}
