import { FinancialMonthStoreProvider } from "./_providers/financial-managment-store-provider";
import { SettlementStoreProvider } from "./_providers/settlement-store-provider";
import { FinancialManagementLayoutProps } from "./_types/financial-management-layout-props";

export default function FinancialManagementLayout({
  children,
}: FinancialManagementLayoutProps) {
  return (
    <FinancialMonthStoreProvider>
      <SettlementStoreProvider>{children}</SettlementStoreProvider>
    </FinancialMonthStoreProvider>
  );
}
