import WalletBalanceCardComponent from "../_components/wallet-balance-card-component";
import WalletTransactionsLayout from "./wallet-transactions-layout";

export default function WalletLayout() {
  return (
    <div className="flex min-h-full w-full max-w-[440px] flex-col items-center bg-white pt-[122px] pb-12">
      <WalletBalanceCardComponent />
      <WalletTransactionsLayout />
    </div>
  );
}
