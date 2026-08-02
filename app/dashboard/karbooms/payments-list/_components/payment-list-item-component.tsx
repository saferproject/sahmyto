import { motion } from "motion/react";
import { Button } from "@mui/material";

import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import { PaymentListItemProps } from "../_types/payment-list-item-props";
import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import { usePaymentListStore } from "../_providers/payments-list-store-provider";
import useApprovePaymentEndpoint from "../_hooks/use-approve-payment-endpoint";

export default function PaymentListItemComponent({
  payment,
  index,
  onShowDetails,
  onReject,
}: PaymentListItemProps) {
  const {} = payment;

  const loggedInUserId = useUserInfoStore((state) => state.id);

  const userKarboomRoles = useKarboomsStore((state) => state.roles);

  const setActivePayment = usePaymentListStore(
    (state) => state.setActivePayment,
  );

  const { mutate: approvePayment } = useApprovePaymentEndpoint();

  const handleApprove = () => {
    approvePayment(id);
  };

  const handleShowDetails = () => {
    setActivePayment(payment);
    onShowDetails();
  };

  return (
    <motion.li
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
      transition={{ delay: index * 0.1, duration: 0.2, ease: "easeIn" }}
      className="border-secondary-lighter w-full rounded-2xl border"
    >
      {/* TODO implement design */}
      <div className="w-full px-4 py-2">
        <Button
          variant="contained"
          size="small"
          onClick={handleShowDetails}
          fullWidth
        >
          نمایش جزئیات
        </Button>
      </div>
      {status === "pending" &&
        userKarboomRoles.includes("partner") &&
        !approvals.find(
          (approval) =>
            approval.user.id == loggedInUserId && approval.status !== "pending",
        ) && (
          <div className="flex items-center gap-4 px-4 py-2">
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => onReject(id)}
              fullWidth
            >
              رد
            </Button>
            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={handleApprove}
              fullWidth
            >
              تایید
            </Button>
          </div>
        )}
    </motion.li>
  );
}
