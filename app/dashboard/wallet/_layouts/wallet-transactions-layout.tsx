import { Candle } from "iconsax-reactjs";

import TransactionItemComponent from "../_components/transaction-item-component";

import { WALLET_TRANSACTIONS } from "../_constants/wallet-transactions";

export default function WalletTransactionsLayout() {
  return (
    <section
      aria-labelledby="transactions-title"
      className="mt-11 w-[329px] max-w-full text-[#162864]"
    >
      <div className="flex h-[22px] items-center justify-between px-6">
        <h2
          id="transactions-title"
          className="text-[11px] font-semibold tracking-[-0.99px]"
        >
          لیست تراکنش ها
        </h2>
        <Candle
          aria-hidden="true"
          size={22}
          variant="Broken"
          className="text-[#162864]"
        />
      </div>

      <ul className="mt-[26px] flex flex-col gap-[19px]">
        {WALLET_TRANSACTIONS.map(({ id, ...transaction }) => (
          <TransactionItemComponent key={id} {...transaction} />
        ))}
      </ul>
    </section>
  );
}
