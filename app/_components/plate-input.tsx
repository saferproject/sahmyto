"use client";

import Image from "next/image";

import { useEffect } from "react";
import { FieldValues, type Path, useWatch } from "react-hook-form";

import IranFlag from "../_assets/images/iran-flag.jpg";

import PlateInputProps, {
  type PlateFormFields,
} from "../_interfaces/plate-input-props";

export default function PlateInput<
  FormType extends FieldValues & PlateFormFields,
>({ register, control, setFocus }: PlateInputProps<FormType>) {
  const firstNumberField = "first_number" as Path<FormType>;
  const secondCharacterField = "second_character" as Path<FormType>;
  const thirdNumberField = "third_number" as Path<FormType>;
  const fourthNumberField = "fourth_number" as Path<FormType>;

  const [firstNumber, secondCharacter, thirdNumber] = useWatch({
    control,
    name: [firstNumberField, secondCharacterField, thirdNumberField],
  });

  useEffect(() => {
    if (String(firstNumber ?? "").length === 2) setFocus(secondCharacterField);
  }, [firstNumber, secondCharacterField, setFocus]);

  useEffect(() => {
    if (String(secondCharacter ?? "").length === 1) setFocus(thirdNumberField);
  }, [secondCharacter, setFocus, thirdNumberField]);

  useEffect(() => {
    if (String(thirdNumber ?? "").length === 3) setFocus(fourthNumberField);
  }, [fourthNumberField, setFocus, thirdNumber]);

  return (
    <div
      dir="ltr"
      className="flex h-16 min-h-16 w-full items-center justify-between overflow-hidden rounded-2xl bg-yellow-400"
    >
      <div className="flex h-full w-10 flex-col justify-between bg-blue-700 p-2">
        <Image
          src={IranFlag}
          alt="پرچم ایران"
          width={24}
          height={12}
          fetchPriority="high"
          priority
          loading="eager"
        />
        <div className="flex flex-col items-start">
          <p className="text-center text-xs font-bold text-white">IR</p>
          <p className="text-xs text-white">IRAN</p>
        </div>
      </div>
      <div className="flex h-full w-[calc(66%-24px)] min-w-24 items-center justify-evenly text-xl">
        <input
          {...register(firstNumberField)}
          type="tel"
          id="first_number"
          maxLength={2}
          placeholder="__"
          className="w-10 text-center font-bold tracking-wider"
        />
        <input
          {...register(secondCharacterField)}
          type="text"
          id="second_character"
          maxLength={1}
          placeholder="_"
          className="w-5 text-center font-bold tracking-wider"
        />
        <input
          {...register(thirdNumberField)}
          type="tel"
          id="third_number"
          maxLength={3}
          placeholder="___"
          className="w-15 text-center font-bold tracking-wider"
        />
      </div>
      <div className="flex h-full w-[calc(33%-24px)] min-w-8 justify-between py-2">
        <div className="h-full border-l"></div>
        <div className="mr-6 flex flex-col items-center justify-between">
          <p className="text-body mt-1 text-xs font-bold">ایران</p>
          <input
            {...register(fourthNumberField)}
            type="tel"
            id="fourth_number"
            maxLength={2}
            placeholder="__"
            className="w-10 text-center text-xl font-bold tracking-wider"
          />
        </div>
      </div>
    </div>
  );
}
