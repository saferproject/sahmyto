"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";

import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import { User, DocumentUpload } from "iconsax-reactjs";

export default function ProfilePictureComponent() {
  const router = useRouter();

  const { avatar } = useUserInfoStore((state) => state);

  const handleNavigateToUploadProfileImage = () => {
    router.push("/dashboard/profile/profile-picture");
  };

  return (
    <div className="border-primary relative flex h-32 min-h-32 w-32 min-w-32 items-center justify-center rounded-full border-2 shadow-lg">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
        {avatar ? (
          <Image
            src={avatar}
            alt="عکس پروفایل"
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <User size={48} className="text-secondary" />
        )}
      </div>
      <button
        className="bg-primary absolute -bottom-4 rounded-full p-2 text-white shadow-lg"
        onClick={handleNavigateToUploadProfileImage}
      >
        <DocumentUpload size={24} variant="Broken" />
      </button>
    </div>
  );
}
