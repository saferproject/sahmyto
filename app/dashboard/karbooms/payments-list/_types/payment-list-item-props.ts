import { Payment } from "./payment";

export type PaymentListItemProps = {
  payment: Payment;
  index: number;
  onShowDetails: () => void;
  onReject: () => void;
};