import Image from "next/image";

import { CloseCircle } from "iconsax-reactjs";

import BannerBackgroundImage from "@/app/dashboard/_assets/_images/home-banner-background.png";

export default function InsuranceBannerComponent() {
  return (
    <div className="relative w-full">
      <Image
        src={BannerBackgroundImage}
        alt=""
        className="w-full"
        loading="eager"
        fetchPriority="high"
      />
      <CloseCircle size={20} className="absolute top-0 -right-1" />
      <p className="absolute top-1/2 left-1/2 w-9/10 -translate-x-1/2 text-xs leading-5">
        صحت اطلاعات وارد شده بر عهده شما است و از منبعی استعلام گرفته نمی شود
      </p>
    </div>
  );
}
