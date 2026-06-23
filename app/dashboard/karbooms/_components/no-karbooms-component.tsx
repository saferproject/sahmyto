import Image from "next/image";

import NoKarboomIcon from "../_assets/_Vectors/no-karboom-icon.svg";

export default function NoKarboomsComponent() {
  return (
    <div className="mt-8 flex w-full flex-col items-center gap-8">
      <Image src={NoKarboomIcon} alt="" />
      <div className="text-body text-center text-sm">
        <p>کاربومی وجود ندارد!</p>
        <p>روی دکمه افزودن ضربه بزنید</p>
      </div>
    </div>
  );
}
