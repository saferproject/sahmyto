"use client";

import Image from "next/image";

import PlateProps from "../_interfaces/plate-props";

import IranFlag from "../_assets/images/iran-flag.jpg";

export default function Plate({
  first_number,
  second_character,
  third_number,
  fourth_number,
}: PlateProps) {
  return (
    <div
      dir="ltr"
      className="flex h-14 w-40 items-center justify-between overflow-hidden rounded-lg bg-yellow-400"
    >
      <div className="flex h-full w-8 flex-col justify-between bg-blue-700 p-2">
        <Image
          src={IranFlag}
          alt="پرچم ایران"
          width={20}
          height={10}
          fetchPriority="high"
          priority
          loading="eager"
        />
        <div className="mt-1 flex flex-col items-start justify-between">
          <p className="text-center text-[10px] font-bold text-white">IR</p>
          <p className="text-[10px] text-white">IRAN</p>
        </div>
      </div>
      <div className="flex h-full w-24 items-center justify-evenly tracking-widest">
        <p>{first_number}</p>
        <p>{second_character}</p>
        <p>{third_number}</p>
      </div>
      <div className="flex h-full w-8 items-center justify-between py-2">
        <div className="h-full border-l"></div>
        <div className="mr-1 flex flex-col items-center justify-between">
          <p className="text-body text-[8px] font-bold">ایران</p>
          <p className="tracking-widest">{fourth_number}</p>
        </div>
      </div>
    </div>
  );
}
