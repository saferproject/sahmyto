import { useEffect } from "react";
import { useSnackbar } from "notistack";
import Image from "next/image";
import { useRouter } from "next/navigation";

import yellowRectangle from "../_assets/_vectors/yellow-rectangle.svg";
import darkBlueRectangle from "../_assets/_vectors/dark-blue-rectangle.svg";
import lightBlueRectangle from "../_assets/_vectors/light-blue-rectangle.svg";

import Plate from "@/app/_components/plate";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

export default function SelectedKarboomInfoComponent() {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const { id, name, plate } = useKarboomsStore((state) => state);

  useEffect(() => {
    if (!id) {
      enqueueSnackbar({
        variant: "warning",
        message: "کاربومی برای نمایش اطلاعات انتخاب نشده است.",
      });
      router.push("/dashboard/karbooms");
    }
  }, [id]);

  return (
    <div className="relative drop-shadow-lg">
      <Image
        src={yellowRectangle}
        alt=""
        className="absolute bottom-0 -left-2 -z-30 scale-120"
      />
      <Image
        src={lightBlueRectangle}
        alt=""
        className="absolute -bottom-6 left-4 -z-20 scale-120"
      />
      <Image
        src={darkBlueRectangle}
        alt=""
        className="absolute -bottom-4 left-0 -z-10 scale-120"
      />
      <div className="flex items-center justify-between rounded-2xl bg-[#FEF9E7] p-8">
        <div>
          <h4 className="text-body-light text-xs">نام کاربوم</h4>
          <p className="text-body font-semibold">{name}</p>
        </div>
        <Plate {...plate} />
      </div>
    </div>
  );
}
