import Image from "next/image";

import { CloseCircle } from "iconsax-reactjs";

import BannerBackgroundImage from "../_assets/_images/home-banner-background.png";
import BannerCoinXL from "../_assets/_images/home-banner-coin-xl.png";
import BannerCoinLG from "../_assets/_images/home-banner-coin-lg.png";
import BannerCoinMD from "../_assets/_images/home-banner-coin-md.png";
import BannerCoinSM from "../_assets/_images/home-banner-coin-sm.png";

export default function DashboardBannerComponent() {
  return (
    <div className="relative w-full mt-4">
      <Image src={BannerBackgroundImage} alt="" className="w-full" loading="eager" fetchPriority="high" />
      <Image
        src={BannerCoinXL}
        alt=""
        className="absolute -top-12 -left-12 scale-75"
      />
      <Image
        src={BannerCoinLG}
        alt=""
        className="absolute -top-4 -left-6 scale-75"
      />
      <Image
        src={BannerCoinMD}
        alt=""
        className="absolute top-8 left-4 scale-75"
      />
      <Image
        src={BannerCoinSM}
        alt=""
        className="absolute top-16 left-8 scale-75"
      />
      <h2 className="text-body absolute top-1/4 left-1/2 -translate-x-1/2 text-sm font-bold text-nowrap">
        سهمیتو، حساب جاده‌ت همیشه رو به راهه!
      </h2>
      <h3 className="text-body absolute top-2/4 left-1/2 -translate-x-1/2 text-sm text-nowrap">
        جاده رو برو، حساب باما!ً
      </h3>
      <CloseCircle size={20} className="absolute top-0 -right-1" />
    </div>
  );
}