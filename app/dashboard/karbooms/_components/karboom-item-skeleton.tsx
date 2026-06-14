import { Skeleton } from "@mui/material";

export default function KarboomItemSkeleton() {
  return (
    <div className="bg-secondary relative flex w-full flex-col rounded-3xl shadow-lg">
      <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-t-3xl object-cover">
        <Skeleton
          variant="rounded"
          width={96}
          height={32}
          sx={{
            position: "absolute",
            top: "32px",
            right: "32px",
          }}
        />
      </div>
      <div className="relative -top-4 flex w-full flex-col gap-4 rounded-3xl bg-white p-4">
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width={128} />
          <Skeleton variant="circular" width={32} height={32} />
        </div>
        <div className="grid w-full grid-cols-2 grid-rows-2 gap-2">
          <Skeleton variant="rounded" height={32} />
          <Skeleton variant="rounded" height={32} />
          <Skeleton variant="rounded" height={32} />
          <Skeleton variant="rounded" height={32} />
        </div>
        <Skeleton variant="rounded" height={32} />
      </div>
      <div className="w-full px-7 pb-4">
        <Skeleton variant="rounded" height={32} />
      </div>
    </div>
  );
}
