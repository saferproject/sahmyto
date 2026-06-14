"use client";

import { useRouter } from "next/navigation";

import { ArrowDown2 } from "iconsax-reactjs";

import ShortcutProps from "../_interfaces/shortcut-props";

export default function ShortcutComponent({ title, icon, path }: ShortcutProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(path);
  };

  return (
    <button
      type="button"
      className="flex flex-col items-center gap-2"
      onClick={handleClick}
    >
      <div className="bg-secondary-lightest flex flex-col items-center gap-4 rounded-full p-2 shadow-lg">
        <div className="bg-primary flex items-center justify-center rounded-full p-2 text-white shadow-lg">
          {icon}
        </div>
        <ArrowDown2 className="text-body" />
      </div>
      <p className="text-body text-sm font-semibold">{title}</p>
    </button>
  );
}
