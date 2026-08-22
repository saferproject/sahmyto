"use client";

import type { ReactNode } from "react";
import { Button } from "@mui/material";

import FormDrawerComponent from "@/app/_components/form-drawer-component";

import ApprovalItemComponent from "./approval-item-component";
import DescriptionBlockComponent from "./description-block-component";
import type { Approval } from "../_types/approval";

interface ApproveRejectConfig {
  canApprove: boolean;
  onApprove: () => void;
  onReject: () => void;
  buttonSize?: "small" | "medium" | "large";
}

interface EntityDetailsDrawerProps {
  title: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
  description?: string | null;
  approvals: Approval[];
  approveConfig?: ApproveRejectConfig;
}

export default function EntityDetailsDrawerComponent({
  title,
  isOpen,
  onOpen,
  onClose,
  children,
  description,
  approvals,
  approveConfig,
}: EntityDetailsDrawerProps) {
  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h4 className="text-body mt-4 font-semibold">{title}</h4>
      {children}
      {description && <DescriptionBlockComponent description={description} />}
      <div className="mt-4 w-full">
        <h5 className="text-body">وضعیت تاییدیه مالکین</h5>
        <ul className="mt-4 flex w-full flex-col gap-4">
          {approvals.map((approval) => (
            <ApprovalItemComponent key={approval.id} approval={approval} />
          ))}
        </ul>
      </div>
      {approveConfig?.canApprove && (
        <div className="flex w-full items-center gap-4 py-2">
          <Button
            variant="outlined"
            color="error"
            size={approveConfig.buttonSize ?? "small"}
            onClick={approveConfig.onReject}
            fullWidth
          >
            رد
          </Button>
          <Button
            variant="outlined"
            color="success"
            size={approveConfig.buttonSize ?? "small"}
            onClick={approveConfig.onApprove}
            fullWidth
          >
            تایید
          </Button>
        </div>
      )}
    </FormDrawerComponent>
  );
}
