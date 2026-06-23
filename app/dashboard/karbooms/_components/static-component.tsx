"use client";

import formatNumber from "@/app/_utilities/format-numbers";

import StaticComponentProps from "../_interfaces/static-component-props";

export default function StaticComponent({ title, value }: StaticComponentProps) {
  return (
    <div>
      <p className="tracking-wider text-sm">{formatNumber(value)}</p>
      <div className="flex items-center justify-between">
        <p className="text-xs">درآمد {title}</p>
        {/* <Image /> */}
      </div>
    </div>
  );
}
