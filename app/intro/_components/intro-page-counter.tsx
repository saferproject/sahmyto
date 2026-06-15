import { motion } from "motion/react";

import IntroPageCounterProps from "../_interfaces/intro-page-counter-props";

export default function IntroPageCounter({
  length,
  currentPageIndex,
  isPaused,
}: IntroPageCounterProps) {
  return (
    <motion.div
      className="flex items-center gap-1"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{ scale: 0.7, opacity: 0 }}
      transition={{
        delay: 0.6,
        duration: 0.2,
        ease: "backOut",
      }}
    >
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className={
            "relative h-2 w-8 flex-1 overflow-hidden rounded-full " +
            (currentPageIndex > index ? "bg-primary" : "bg-secondary")
          }
        >
          {index === currentPageIndex && (
            <span
              key={currentPageIndex}
              className="animate-progress bg-primary absolute inset-0"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}
