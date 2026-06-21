import Image from "next/image";

import { motion } from "motion/react";

import IntroImageProps from "../_interfaces/intro-image-props";

export default function IntroImage({ imageLink, title }: IntroImageProps) {
  return (
    <motion.div
      className="relative flex min-h-0 w-full flex-1"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.2,
        ease: "backOut",
      }}
    >
      <Image
        src={imageLink}
        alt={title}
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        unoptimized
        className="object-contain"
      />
    </motion.div>
  );
}
