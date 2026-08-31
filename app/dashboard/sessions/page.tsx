import { Button, IconButton } from "@mui/material";
import { Android, Apple, Monitor, Trash } from "iconsax-reactjs";

export default function SessionsPage() {
  return (
    <>
      {/* NOTE Current Session */}
      <h3 className="text-body font-bold">نشست کنونی</h3>
      <div
        dir="ltr"
        className="text-body bg-secondary-lightest border-secondary-lighter flex items-center justify-between rounded-2xl border p-2"
      >
        <div className="flex h-full flex-col justify-between">
          <p>{"Mobile"}</p>
          <p>{"android"}</p>
          <p className="text-secondary-dark">{`${"1405/06/10 - 14:26"}`}</p>
        </div>
        <div className="bg-primary rounded-2xl p-4">
          {true ? (
            true ? (
              <Android size="48" className="text-white" />
            ) : (
              <Apple size="48" className="text-white" />
            )
          ) : (
            <Monitor size="48" className="text-white" />
          )}
        </div>
      </div>
      {/* NOTE Instructions */}
      <p className="text-body my-4 text-sm">
        اگر دستگاه های پایین را نمی شناسید دسترسی آن ها را قطع کنید
      </p>
      <Button variant="outlined" color="error" fullWidth>
        قطع دسترسی همه دستگاه ها
      </Button>
      {/* NOTE Active Sessions List */}
      <h3 className="text-body font-bold mt-4">نشست های فعال</h3>
      <ul className="flex flex-col gap-4">
        <li
          dir="ltr"
          className="border-secondary-lighter bg-secondary-lightest flex items-center justify-between rounded-2xl border p-2"
        >
          <div className="flex items-center gap-4">
            <div className="bg-secondary-light border-primary flex size-16 items-center justify-center rounded-full border p-1">
              {true ? (
                true ? (
                  <Android size="32" className="text-primary" />
                ) : (
                  <Apple size="32" className="text-primary" />
                )
              ) : (
                <Monitor size="32" className="text-primary" />
              )}
            </div>
            <div className="flex h-full flex-col justify-between">
              <p>{"Mobile"}</p>
              <p>{"android"}</p>
              <p className="text-secondary-dark">{`${"1405/06/10 - 14:26"}`}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500">
            <IconButton>
              <Trash size="32" className="text-white" variant="Bold" />
            </IconButton>
          </div>
        </li>
      </ul>
    </>
  );
}
