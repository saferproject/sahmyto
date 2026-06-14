"use client";

import { useRouter } from "next/navigation";

import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import { Upload } from "@solar-icons/react/ssr";
import { User } from "iconsax-reactjs";

export default function ProfilePictureComponent() {
  const router = useRouter();

  const { avatar } = useUserInfoStore((state) => state);

  const handleNavigateToUploadProfileImage = () => {
    router.push("/dashboard/profile/profile-picture");
  };

  return (
    <div className="border-primary relative flex h-32 min-h-32 w-32 min-w-32 items-center justify-center rounded-full border-2 shadow-lg">
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
        {avatar ? (
          <img src={avatar} alt="عکس پروفایل" />
        ) : (
          <User size={48} className="text-secondary" />
        )}
      </div>
      <button
        className="bg-primary absolute -bottom-4 rounded-full p-2 text-white shadow-lg"
        onClick={handleNavigateToUploadProfileImage}
      >
        <Upload size={24} weight="Broken" />
      </button>
    </div>
  );
}
