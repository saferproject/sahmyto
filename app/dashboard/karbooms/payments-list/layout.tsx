import { PaymentListStoreProvider } from "./_providers/payments-list-store-provider";
import { PaymentsListLayoutProps } from "./_types/payments-list-layout-props";

export default function PaymentsListLayout({ children }: PaymentsListLayoutProps) {
  return <PaymentListStoreProvider>{children}</PaymentListStoreProvider>;
}