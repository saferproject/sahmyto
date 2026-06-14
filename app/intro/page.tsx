"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import IntroLanding from "./_components/intro-landing";

import { INTRO_PAGES_CONTENTS } from "./_constants/intro-pages-contents";
import IntroFooter from "./_components/intro-footer";
import IntroImage from "./_components/intro-image";
import IntroTitle from "./_components/intro-title";

export default function IntroLayout() {
  const router = useRouter();

  // NOTE if set to null, intro landing is visible
  const [currentPageIndex, setCurrentPageIndex] = useState<number | null>(null);
  const [isVisible, setVisibility] = useState(true);

  // NOTE timer for changing slides automatically
  // NOTE should not be less than 4500 ms
  // NOTE after timer for all pages end, navigates to login
  useEffect(() => {
    if (currentPageIndex === INTRO_PAGES_CONTENTS.length - 1) {
      setTimeout(() => router.push("/login"), 4500);
      return;
    }

    const exitAnimationTimer = setTimeout(() => {
      setVisibility(false);
    }, 3800);

    const pageTimer = setTimeout(() => {
      setCurrentPageIndex((curValue) => (curValue === null ? 0 : curValue + 1));
      setVisibility(true);
    }, 4500);

    return () => {
      clearTimeout(pageTimer);
      clearTimeout(exitAnimationTimer);
    };
  }, [currentPageIndex]);

  return currentPageIndex === null ? (
    <IntroLanding />
  ) : (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            <IntroImage {...INTRO_PAGES_CONTENTS[currentPageIndex]} />
            <IntroTitle {...INTRO_PAGES_CONTENTS[currentPageIndex]} />
          </motion.div>
        )}
      </AnimatePresence>
      <IntroFooter
        length={INTRO_PAGES_CONTENTS.length}
        currentPageIndex={currentPageIndex}
      />
    </>
  );
}
