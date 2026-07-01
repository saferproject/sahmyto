import Image from 'next/image';

import BannerBackgroundImage from "@/app/_assets/_images/home-banner-background.png";
import { CloseCircle } from 'iconsax-reactjs';

export default function ThirdPartyInsuranceBannerComponent() {
  return (
    <div className="relative mt-4 w-full">
      <Image
        src={BannerBackgroundImage}
        alt=""
        className="w-full"
        loading="eager"
        fetchPriority="high"
      />
      <CloseCircle size={20} className="absolute top-0 -right-1" />
      <p>صحت اطلاعات وارد شده بر عهده شما است و صرفا از منبعی استعلام گرفته نمی شود</p>
    </div>
  );
}
