import Image from "next/image";

import NoKarboomIcon from "../_assets/_vectors/no-karboom-icon.svg";
import { Button } from "@mui/material";
import { NoKarboomsProps } from "../_types/no-karbooms-props";

export default function NoKarboomsComponent({ onAddKarboom }: NoKarboomsProps) {
  return (
    <div className="mt-8 flex w-full flex-col items-center gap-8">
      <Image src={NoKarboomIcon} alt="" />
      <div className="text-body text-center text-sm">
        <p>کاربومی وجود ندارد!</p>
        <Button variant="contained" size="large" onClick={onAddKarboom}>
          افزودن کاربوم
        </Button>
      </div>
    </div>
  );
}
