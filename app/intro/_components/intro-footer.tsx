import IntroMoto from "./intro-moto";
import IntroPageCounter from "./intro-page-counter";

import IntroFooterProps from "../_interfaces/intro-footer-props";

export default function IntroFooter({
  length,
  currentPageIndex,
  isPaused,
}: IntroFooterProps) {
  return (
    <div className="flex w-full flex-col items-center gap-8 fixed bottom-16">
      <IntroMoto />
      <IntroPageCounter
        length={length}
        currentPageIndex={currentPageIndex}
        isPaused={isPaused}
      />
    </div>
  );
}
