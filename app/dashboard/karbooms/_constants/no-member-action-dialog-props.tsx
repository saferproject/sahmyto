"use client";

import { Button } from "@mui/material";
import { Profile2User } from "iconsax-reactjs";

export default function NO_MEMBER_ACTION_DIALOG_PROPS(
  addPartnerFn: () => void,
  addDriverFn: () => void,
  closeFn: () => void,
) {
  return {
    isOpen: true,
    icon: <Profile2User size={64} className="text-primary" />,
    title: "کاربوم عضو ندارد",
    description:
      "برای ثبت درآمد ابتدا باید یک شریک یا راننده در کاربوم ثبت کنید",
    actionButtons: (
      <div className="flex w-full flex-col gap-2">
        <Button variant="outlined" size="large" onClick={addPartnerFn}>
          افزودن شریک
        </Button>
        <Button variant="outlined" size="large" onClick={addDriverFn}>
          افزودن راننده
        </Button>
      </div>
    ),
    persistant: false,
    onClose: closeFn,
  };
}
