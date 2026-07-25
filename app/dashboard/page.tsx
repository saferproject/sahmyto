import DashboardBannerComponent from "./_components/dashboard-banner-component";
import DashboardSliderComponent from "./_components/dashboard-slider-component";

export default function DashboardPage() {
  return (
    <div className="h-full w-full overflow-y-auto overflow-x-visible pt-26 pb-24 px-4">
      <DashboardBannerComponent />
      <DashboardSliderComponent />
    </div>
  );
}
