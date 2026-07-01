import { motion } from "motion/react";
import { ThirdPartyInsuranceListItemProps } from "../_types/third-party-insurance-list-item-props";

export default function ThirdPartyInsuranceListItemComponent({
  thirdPartyInsurance,
  index,
}: ThirdPartyInsuranceListItemProps) {
  return (
    <motion.li
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
      transition={{ delay: index * 0.1, duration: 0.2, ease: "easeIn" }}
      className="border-secondary-lighter w-full rounded-2xl border"
    ></motion.li>
  );
}