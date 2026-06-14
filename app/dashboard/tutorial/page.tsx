import Image from "next/image";

import { Play } from "iconsax-reactjs";
import { IconButton } from "@mui/material";

import formatTime from "./_utilities/format-time";

export default function TutorialPage() {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <h2 className="">آموزش کار با سهمیتو</h2>
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12">
        <div className="relative col-span-2">
          <Image
            src="/images/video-item-vector-back.svg"
            alt=""
            width={64}
            height={128}
            className="absolute -top-6 right-4 -z-30"
          />
          <Image
            src="/images/video-item-vector-middle.svg"
            alt=""
            width={64}
            height={128}
            className="absolute -top-7 right-4 -z-20"
          />
          <Image
            src="/images/video-item-vector-front.svg"
            alt=""
            width={64}
            height={128}
            className="absolute -top-3 right-7 -z-10"
          />
          <div className="felx absolute -top-5 left-2 items-center justify-center rounded-full bg-white p-1 shadow-lg">
            <IconButton
              size="small"
              sx={{
                backgroundColor: "#ff8500",
              }}
            >
              <Play size={24} variant="Bold" className="text-white" />
            </IconButton>
          </div>
          <div className="border-secondary bg-secondary-lightest flex w-full items-center justify-between rounded-2xl border p-4 px-5">
            <div className="flex flex-col items-center">
              <p className="font-semibold">{"سهمیتو"}</p>
              <p className="font-light">{"چرتکه سهم تو"}</p>
            </div>
            <p className="font-light">{"معرفی سهمیتو"}</p>
            <p className="font-semibold">{formatTime(72)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
