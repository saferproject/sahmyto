"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// NOTE total time a slide stays before advancing; keep in sync with the
//      `progress` keyframe duration in globals.css.
const PAGE_DURATION = 4500;
// NOTE when the slide's exit animation kicks in (just before the advance).
const EXIT_AT = 3800;

/**
 * Owns the intro carousel timing and navigation.
 *
 * The auto-advance timer is *pausable*: `pause()` freezes it (preserving how
 * much of the current slide has elapsed) and `resume()` continues from there.
 * `goNext()`/`goPrevious()` perform manual navigation and always (re)start the
 * current slide with a fresh, full-duration timer.
 *
 * `currentPageIndex === null` means the intro landing splash is showing; a
 * numeric index means the matching slide is showing.
 */
export default function useIntroCarousel(pagesCount: number) {
  const router = useRouter();

  const [currentPageIndex, setCurrentPageIndex] = useState<number | null>(null);
  const [isVisible, setVisibility] = useState(true);
  const [isPaused, setPaused] = useState(false);

  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // NOTE ms already played on the current slide (excludes paused time).
  const elapsedRef = useRef(0);
  // NOTE timestamp the current running segment started at.
  const segmentStartRef = useRef(0);
  const exitFiredRef = useRef(false);
  const pausedRef = useRef(false);
  // NOTE mirror of currentPageIndex for stale-free reads inside callbacks.
  const currentPageIndexRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    exitTimerRef.current = null;
    advanceTimerRef.current = null;
  }, []);

  // NOTE schedules the exit + advance timers from the already-elapsed offset,
  //      so it works both for a fresh slide and for resuming after a pause.
  const startSegment = useCallback(
    (pageIndex: number | null) => {
      segmentStartRef.current = Date.now();
      const elapsed = elapsedRef.current;
      const isLastSlide = pageIndex === pagesCount - 1;

      // The last slide has no exit animation; it simply routes to /login.
      if (!isLastSlide && !exitFiredRef.current) {
        exitTimerRef.current = setTimeout(
          () => {
            exitFiredRef.current = true;
            setVisibility(false);
          },
          Math.max(0, EXIT_AT - elapsed),
        );
      }

      advanceTimerRef.current = setTimeout(
        () => {
          if (isLastSlide) {
            router.push("/login");
            return;
          }
          setCurrentPageIndex((current) => (current === null ? 0 : current + 1));
          setVisibility(true);
        },
        Math.max(0, PAGE_DURATION - elapsed),
      );
    },
    [pagesCount, router],
  );

  // NOTE every slide change starts a fresh, unpaused, full-duration segment.
  useEffect(() => {
    currentPageIndexRef.current = currentPageIndex;
    elapsedRef.current = 0;
    exitFiredRef.current = false;
    pausedRef.current = false;
    setPaused(false);
    setVisibility(true);
    startSegment(currentPageIndex);

    return clearTimers;
  }, [currentPageIndex, startSegment, clearTimers]);

  const pause = useCallback(() => {
    if (pausedRef.current) return;
    pausedRef.current = true;
    clearTimers();
    elapsedRef.current += Date.now() - segmentStartRef.current;
    setPaused(true);
  }, [clearTimers]);

  const resume = useCallback(() => {
    if (!pausedRef.current) return;
    pausedRef.current = false;
    setPaused(false);
    startSegment(currentPageIndexRef.current);
  }, [startSegment]);

  const goNext = useCallback(() => {
    clearTimers();
    pausedRef.current = false;
    setPaused(false);

    const current = currentPageIndexRef.current;
    if (current === pagesCount - 1) {
      router.push("/login");
      return;
    }
    // The slide-change effect restarts the timer with a fresh duration.
    setCurrentPageIndex((value) => (value === null ? 0 : value + 1));
    setVisibility(true);
  }, [clearTimers, pagesCount, router]);

  // NOTE returns false when already on the first slide (nothing to go back to),
  //      so the caller can resume the paused timer instead.
  const goPrevious = useCallback(() => {
    const current = currentPageIndexRef.current;
    if (current === null || current === 0) return false;

    clearTimers();
    pausedRef.current = false;
    setPaused(false);
    setCurrentPageIndex(current - 1);
    setVisibility(true);
    return true;
  }, [clearTimers]);

  return {
    currentPageIndex,
    isVisible,
    isPaused,
    pause,
    resume,
    goNext,
    goPrevious,
  };
}
