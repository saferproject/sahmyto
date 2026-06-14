"use client";

import { FieldValues, useWatch } from "react-hook-form";
import PlateInputProps from "../_interfaces/plate-input-props";
import { useEffect } from "react";

export default function PlateInput<FormType extends FieldValues>({
  register,
  control,
  setFocus,
}: PlateInputProps<FormType>) {
  const { first_number, second_character, third_number } = useWatch({
    control,
  });

  useEffect(() => {
    //@ts-ignore
    if (first_number?.length === 2) setFocus("second_character");
  }, [first_number]);

  useEffect(() => {
    //@ts-ignore
    if (second_character?.length === 1) setFocus("third_number");
  }, [second_character]);

  useEffect(() => {
    //@ts-ignore
    if (third_number?.length === 3) setFocus("fourth_number");
  }, [third_number]);

  return (
    <div
      dir="ltr"
      className="flex min-h-14 h-14 w-full items-center justify-between overflow-hidden rounded-2xl bg-yellow-400"
    >
      <div className="h-full w-6 bg-blue-700"></div>
      <div className="flex h-full w-[calc(66%-24px)] min-w-24 items-center justify-evenly">
        <input
          //@ts-ignore
          {...register("first_number")}
          type="tel"
          id="first_number"
          maxLength={2}
          placeholder="__"
          className="w-10 text-center font-bold tracking-wider"
        />
        <input
          //@ts-ignore
          {...register("second_character")}
          type="text"
          id="second_character"
          maxLength={1}
          placeholder="_"
          className="w-5 text-center font-bold tracking-wider"
        />
        <input
          //@ts-ignore
          {...register("third_number")}
          type="tel"
          id="third_number"
          maxLength={3}
          placeholder="___"
          className="w-15 text-center font-bold tracking-wider"
        />
      </div>
      <div className="flex h-full w-[calc(33%-24px)] min-w-8 flex-col items-center justify-between border-l">
        <p className="text-body mt-1 text-xs font-bold">ایران</p>
        <input
          //@ts-ignore
          {...register("fourth_number")}
          type="tel"
          id="fourth_number"
          maxLength={2}
          placeholder="__"
          className="w-10 text-center font-bold tracking-wider"
        />
      </div>
    </div>
  );
}
