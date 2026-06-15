"use client";

import { Button } from "@mui/material";
import { Bus } from "iconsax-reactjs";

import Plate from "@/app/_components/plate";

import RequestProps from "../_interfaces/collaboration-request-notification-props";
import { MemberRolesFa } from "@/app/_constants/member-roles-fa";

export default function RequestComponent({
  request: {
    id,
    karboom: {
      name: karboomName,
      plate,
      owner: { full_name: requesterName, phone: requesterPhone },
    },
    role_type,
  },
  onAccept,
  onReject,
  mutatingRequest,
  requestIsAccepting,
  requestIsRejecting,
}: RequestProps) {
  return (
    <li className="border-secondary flex flex-col rounded-3xl border bg-white">
      <div className="bg-secondary relative rounded-3xl p-4">
        <h4 className="text-body w-full text-center text-sm font-bold">
          یک درخواست همکاری جدید دارید !
        </h4>
        <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-white p-3">
          <div className="flex flex-col gap-1">
            <div className="text-secondary flex items-center gap-1 text-xs">
              <Bus size={20} variant="Linear" />
              <span>نام کاربوم</span>
            </div>
            <p className="text-body mr-6 font-bold">{karboomName}</p>
          </div>
          <Plate {...plate} />
        </div>
      </div>
      <div className="flex flex-col gap-3 px-2 pt-6 pb-2">
        <p className="text-body text-center text-sm">
          آقای <b>{requesterName}</b> با شماره : <b>{requesterPhone}</b>
        </p>
        <p className="text-body text-center text-sm">
          شما را به عنوان <b>{MemberRolesFa[role_type]}</b> به کاربوم با مشخصات
          فوق اضافه کرده است !
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => onAccept(id)}
            loading={requestIsAccepting && id === mutatingRequest}
            disabled={
              (requestIsAccepting || requestIsRejecting) &&
              id !== mutatingRequest
            }
          >
            می‌پذیرم
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onReject(id)}
            loading={requestIsRejecting && id === mutatingRequest}
            disabled={
              (requestIsAccepting || requestIsRejecting) &&
              id !== mutatingRequest
            }
          >
            نمی‌پذیرم
          </Button>
        </div>
      </div>
    </li>
  );
}
