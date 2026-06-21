import Image from "next/image";

import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";

export default function IntroLanding() {
  // NOTE when set to false exit animations start
  const [visible, setVisible] = useState(true);

  // NOTE timer to start exit animations
  setTimeout(() => setVisible(false), 3000);

  return (
    <AnimatePresence>
      {visible && (
        <div className="flex h-dvh w-full flex-col justify-end">
          <motion.div
            className="bg-primary fixed h-96 w-96 rounded-tr-[160px]"
            initial={{ x: "-100vw", y: "-100vh", rotate: 0 }}
            animate={{
              x: "-55vw",
              y: "-60vh",
              rotate: 66,
            }}
            exit={{ x: "-100vw", y: "-100vh", rotate: 0 }}
            transition={{
              duration: 0.5,
              ease: "backOut",
            }}
          />
          <div className="flex h-1/2 flex-col items-center justify-between">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{
                  delay: 0.5,
                  duration: 0.2,
                  ease: "backOut",
                }}
              >
                <Image
                  src="/images/logo-primary.svg"
                  alt="سهمیتو"
                  loading="eager"
                  fetchPriority="high"
                  width={128}
                  height={64}
                />
              </motion.div>
              <motion.h1
                className="font-yekan-bakh text-body font-semibold"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{
                  delay: 0.7,
                  duration: 0.2,
                  ease: "backOut",
                }}
              >
                تکنولوژی در خدمت کامیون دار ها
              </motion.h1>
            </div>
            <div className="mb-12 flex flex-col items-center gap-8">
              <motion.h2
                className="font-yekan-bakh text-body tracking-wider"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.7,
                }}
                transition={{
                  delay: 0.9,
                  duration: 0.2,
                  ease: "backOut",
                }}
              >
                <span className="text-heading font-semibold">Sahmito</span> Your
                share of the abacus
              </motion.h2>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
