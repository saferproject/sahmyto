import Image from "next/image";

import { motion } from "motion/react";

export default function IntroMoto() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{ scale: 0.7, opacity: 0 }}
      transition={{
        delay: 0.4,
        duration: 0.2,
        ease: "backOut",
      }}
    >
      <div className="flex items-center justify-center gap-4">
        <Image
          src="/images/logo-secondary.svg"
          alt="سهمیتو"
          loading="eager"
          fetchPriority="high"
          width={80}
          height={40}
        />
        <h2 className="text-primary mb-1 text-xl font-semibold">Sahmito</h2>
      </div>
      <p className="text-body tracking-wide">Your share of the abacus</p>
    </motion.div>
  );
}
