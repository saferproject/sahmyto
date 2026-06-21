import IntroMoto from "./intro-moto";
import IntroPageCounter from "./intro-page-counter";

import IntroFooterProps from "../_interfaces/intro-footer-props";

export default function IntroFooter({
  length,
  currentPageIndex,
  isPaused,
}: IntroFooterProps) {
  return (
    <div className="mt-auto flex w-full flex-col items-center gap-4 pt-4 pb-8">
      <IntroMoto />
      <IntroPageCounter
        length={length}
        currentPageIndex={currentPageIndex}
        isPaused={isPaused}
      />
    </div>
  );
}
