import IntroPageContent from "./intro-page-content";

type IntroContentProps = {
  introContent: Omit<IntroPageContent, "id">;
  isVisible: boolean;
};

export default IntroContentProps;
