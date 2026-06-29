"use client";

import { Button } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { UserSquare } from "iconsax-reactjs";
import { useRouter } from "next/navigation";
import imageComperssor from "browser-image-compression";

import convertFileToDataURL from "./_utilities/convert-file-to-dataURL";
import { cropImage } from "./_utilities/crop-image";
import convertDataURLtoFile from "./_utilities/convert-dataURL-to-file";

import useUploadProfileImageEndpoint from "./_hooks/use-upload-profile-image-endpoint";

export default function ProfilePicturePage() {
  const fileInput = useRef<HTMLInputElement>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.1);
  const [image, setImage] = useState<string | undefined>();
  const [croppedImage, setCroppedImage] = useState<string>("");

  const router = useRouter();

  const { mutate } = useUploadProfileImageEndpoint();

  const handleCrop = async (_croppedArea: Area, croppedAreaPixels: Area) => {
    if (croppedAreaPixels && image)
      setCroppedImage(await cropImage(image, croppedAreaPixels));
  };

  const handleImageInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0])
      setImage(convertFileToDataURL(event.target.files[0]));
  };

  const handleUploadImage = async () => {
    if (!croppedImage) return;

    const imageFile = await imageComperssor(
      convertDataURLtoFile(croppedImage, "profile-image"),
      { fileType: "image/jpeg", maxIteration: 20, maxSizeMB: 0.5 },
    );

    const formData = new FormData();

    formData.set("avatar", imageFile);

    mutate(formData, { onSuccess: () => handleReturn() });
  };

  const handleReturn = () => {
    router.push("/dashboard/profile");
  };

  const handleSelectImage = () => {
    if (fileInput.current) fileInput.current.click();
  };

  const hasRequestedFile = useRef(false);

  useEffect(() => {
    // Guard against React Strict Mode double-invoking the effect in dev, which
    // would otherwise open the file picker twice.
    if (hasRequestedFile.current) return;
    hasRequestedFile.current = true;

    fileInput.current?.click();
  }, []);

  return (
    <div className="flex size-full flex-col overflow-y-auto">
      <input
        ref={fileInput}
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={handleImageInput}
      />
      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl bg-black">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={handleCrop}
          onZoomChange={setZoom}
          cropShape="round"
          showGrid={false}
          style={{
            cropAreaStyle: { color: "#ffffff70" },
            containerStyle: { backgroundColor: "#000", borderRadius: "16px" },
          }}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-body font-semibold">قوانین آپلود تصویر</h3>
            <UserSquare size="32" className="text-body" />
          </div>
          <p className="text-body-light mt-4 text-sm">
            سایز عکس میبایست کمتر از 512 کیلوبایت باشد <br /> فرمت تصاویر
            میبایست با فرمت png و یا jpg باشد
          </p>
        </div>
        <div className="flex w-full flex-col gap-4">
          <Button
            variant="contained"
            onClick={handleUploadImage}
            disabled={!croppedImage}
            fullWidth
          >
            ثبت تصویر
          </Button>
          <Button variant="outlined" onClick={handleSelectImage} fullWidth>
            انتخاب عکس
          </Button>
          <Button onClick={handleReturn} fullWidth>
            انصراف
          </Button>
        </div>
      </div>
    </div>
  );
}
