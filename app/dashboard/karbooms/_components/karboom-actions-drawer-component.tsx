import { useRouter } from "next/navigation";

import { SwipeableDrawer } from "@mui/material";

import { KarboomActionsDrawerProps } from "../_types/karboom-actions-drawer-props";

import { KARBOOM_ACTIONS } from "../_constants/karboom-actions";

export default function KarboomActionsDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: KarboomActionsDrawerProps) {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            borderRadius: "32px 32px 0 0",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
          },
        },
      }}
    >
      <div className="relative flex max-h-[90dvh] w-full flex-col px-8 py-12">
        <div className="bg-secondary-light absolute top-6 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full"></div>
        <div className="flex min-h-0 w-full flex-1 flex-col items-center">
          <h4 className="text-body mb-4 text-lg font-semibold">
            عملیات های کاربوم
          </h4>
          <menu className="mb-4 flex w-full min-h-0 flex-1 flex-col overflow-y-auto">
            {KARBOOM_ACTIONS.map(({ label, icon, path }) => (
              <li
                key={label}
                role="button"
                tabIndex={0}
                className="text-body border-secondary-light flex w-full items-center justify-between border-b py-4 last:border-0"
                onClick={() => handleNavigation(path)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ")
                    handleNavigation(path);
                }}
              >
                <p className="text-body">{label}</p>
                {icon}
              </li>
            ))}
          </menu>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
