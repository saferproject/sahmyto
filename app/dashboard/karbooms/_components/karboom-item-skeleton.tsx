import { Skeleton } from "@mui/material";

export default function KarboomItemSkeleton() {
  return (
    <div className="relative flex w-full flex-col rounded-3xl bg-transparent drop-shadow-lg">
      <div className="relative -bottom-5 h-24 w-full overflow-hidden rounded-t-3xl">
        <Skeleton
          variant="rectangular"
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <div className="absolute left-4 top-6">
          <Skeleton variant="rounded" width={120} height={40} />
        </div>
      </div>
      <div className="relative flex w-full flex-col gap-4 rounded-3xl bg-white p-4">
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width={120} />
          <Skeleton variant="circular" width={32} height={32} />
        </div>
        <div className="grid w-full grid-cols-2 grid-rows-2 gap-2">
          <Skeleton variant="rounded" height={36} />
          <Skeleton variant="rounded" height={36} />
          <Skeleton variant="rounded" height={36} />
          <Skeleton variant="rounded" height={36} />
        </div>
        <Skeleton variant="rounded" height={42} />
      </div>
    </div>
  );
}
