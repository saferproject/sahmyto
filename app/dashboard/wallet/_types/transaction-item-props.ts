import { WalletTransaction } from "./wallet-transaction";

export type TransactionItemProps = Omit<WalletTransaction, "id">;
