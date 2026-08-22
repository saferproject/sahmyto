"use client";

import { motion } from "motion/react";
import type { MouseEventHandler, ReactNode } from "react";

interface AnimatedListItemProps {
  index: number;
  className?: string;
  dimmed?: boolean;
  onClick?: MouseEventHandler<HTMLLIElement>;
  children?: ReactNode;
}

export default function AnimatedListItem({
  index,
  className,
  dimmed = false,
  onClick,
  children,
}: AnimatedListItemProps) {
  return (
    <motion.li
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: dimmed ? 0.6 : 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
      transition={{ delay: index * 0.1, duration: 0.2, ease: "easeIn" }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.li>
  );
}
