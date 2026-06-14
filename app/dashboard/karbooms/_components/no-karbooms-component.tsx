import Image from "next/image";

import NoKarboomIcon from "../_assets/_Vectors/no-karboom-icon.svg";

export default function NoKarboomsComponent() {
  return (
    <div className="mt-8 flex w-full flex-col items-center gap-8">
      <Image src={NoKarboomIcon} alt="" />
      <p className="text-sm text-body text-center">کاربومی وجود ندارد! <br /> روی دکمه افزودن ضربه بزنید</p>
    </div>
  );
}
