"use client";

import { motion, AnimatePresence } from "motion/react";
import { useDrag } from "@use-gesture/react";

import IntroLanding from "./_components/intro-landing";

import { INTRO_PAGES_CONTENTS } from "./_constants/intro-pages-contents";
import IntroFooter from "./_components/intro-footer";
import IntroImage from "./_components/intro-image";
import IntroTitle from "./_components/intro-title";

import useIntroCarousel from "./_hooks/use-intro-carousel";

// NOTE horizontal travel (px) past which a drag counts as a swipe instead of
//      a press-and-hold; below it, the gesture is treated as a hold/tap.
const SWIPE_THRESHOLD = 60;

export default function IntroLayout() {
  const {
    currentPageIndex,
    isVisible,
    isPaused,
    pause,
    resume,
    goNext,
    goPrevious,
  } = useIntroCarousel(INTRO_PAGES_CONTENTS.length);

  // A single drag handler arbitrates between the two gestures so they never
  // collide: while a finger is down the auto-advance timer is paused; on
  // release we either navigate (movement crossed the swipe threshold) or just
  // resume (it was a press-and-hold or a tap).
  //
  // Directions are mirrored for the app's RTL layout: swiping *right* advances
  // to the next slide, swiping *left* goes back.
  const bind = useDrag(
    ({ down, last, tap, movement: [moveX] }) => {
      if (tap) {
        // A tap still fires `down` first, so make sure we un-pause.
        resume();
        return;
      }

      if (down) {
        pause();
        return;
      }

      if (last) {
        if (Math.abs(moveX) <= SWIPE_THRESHOLD) {
          resume();
        } else if (moveX > 0) {
          // RTL: swipe right -> forward
          goNext();
        } else {
          // RTL: swipe left -> back (resume if there's no previous slide)
          if (!goPrevious()) resume();
        }
      }
    },
    // `triggerAllEvents` makes the handler fire on touch-down even before the
    // movement crosses the tap threshold, so a stationary press-and-hold still
    // pauses the timer (otherwise `down` never fires until the finger moves).
    { filterTaps: true, triggerAllEvents: true, pointer: { touch: true } },
  );

  if (currentPageIndex === null) return <IntroLanding />;

  return (
    <div
      {...bind()}
      className="h-dvh w-full touch-none select-none"
    >
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
        isPaused={isPaused}
      />
    </div>
  );
}
