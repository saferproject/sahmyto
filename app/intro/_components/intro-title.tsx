import { motion } from "motion/react";

import IntroTitleProps from "../_interfaces/intro-title-props";

export default function IntroTitle({
  title,
  description,
}: IntroTitleProps) {
  return (
    <motion.div
      className="font-yekan-bakh flex w-full flex-col items-center gap-2 px-4"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        delay: 0.2,
        duration: 0.2,
        ease: "backOut",
      }}
    >
      <h1 className="text-heading text-center text-2xl font-semibold">{title}</h1>
      <p className="text-body text-center text-sm">{description}</p>
    </motion.div>
  );
}
