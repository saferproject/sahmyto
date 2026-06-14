import IntroPageContent from "./intro-page-content";

export default interface IntroContentProps {
  introContent: Omit<IntroPageContent, "id">;
  isVisible: boolean;
}