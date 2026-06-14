"use client";

import PlateProps from "../_interfaces/plate-props";

export default function Plate({
  first_number,
  second_character,
  third_number,
  fourth_number,
}: PlateProps) {
  return (
    <div
      dir="ltr"
      className="flex h-10 w-36 items-center justify-between overflow-hidden rounded-lg bg-yellow-400"
    >
      <div className="h-full w-4 bg-blue-700"></div>
      <div className="flex h-full w-24 items-center justify-evenly">
        <p>{first_number}</p>
        <p>{second_character}</p>
        <p>{third_number}</p>
      </div>
      <div className="flex h-full w-8 flex-col items-center justify-between border-l">
        <p className="text-body text-[8px] font-bold">ایران</p>
        <p>{fourth_number}</p>
      </div>
    </div>
  );
}
