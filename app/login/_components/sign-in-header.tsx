"use client";

import Image from "next/image";

import { DocumentText } from "@solar-icons/react";

export default function LoginHeader() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="rounded-lg p-2 shadow-md">
        <DocumentText weight="Broken" size="32" className="text-secondary" />
      </div>
      <div className="rounded-lg p-2 shadow-md">
        <DocumentText weight="Broken" size="32" className="text-secondary" />
      </div>
      <div className="bg-primary rounded-lg shadow-md">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white object-cover p-2">
          <Image src='/images/logo-icon.webp' alt="لوگو" width={64} height={64} />
        </div>
      </div>
      <div className="rounded-lg p-2 shadow-md">
        <DocumentText weight="Broken" size="32" className="text-secondary" />
      </div>
      <div className="rounded-lg p-2 shadow-md">
        <DocumentText weight="Broken" size="32" className="text-secondary" />
      </div>
    </div>
  );
}
