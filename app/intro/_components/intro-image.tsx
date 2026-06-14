import Image from "next/image";

import { motion } from "motion/react";

import IntroImageProps from "../_interfaces/intro-image-props";

export default function IntroImage({
  imageLink,
  title,
  imageWidth,
  imageHeight,
}: IntroImageProps) {
  return (
    <motion.div
      className="flex items-center justify-center object-cover p-16 w-full fixed top-16"
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
        width={imageWidth}
        height={imageHeight}
        loading="eager"
        fetchPriority="high"
        unoptimized
      />
    </motion.div>
  );
}
