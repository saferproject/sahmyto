"use client";

import Cropper, { type Area } from "react-easy-crop";

interface CropperComponentProps {
  image?: string;
  crop: { x: number; y: number };
  zoom: number;
  onCropChange: (crop: { x: number; y: number }) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  onZoomChange: (zoom: number) => void;
}

export default function CropperComponent({
  image,
  crop,
  zoom,
  onCropChange,
  onCropComplete,
  onZoomChange,
}: CropperComponentProps) {
  return (
    <Cropper
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={1 / 1}
      onCropChange={onCropChange}
      onCropComplete={onCropComplete}
      onZoomChange={onZoomChange}
      cropShape="round"
      showGrid={false}
      style={{
        cropAreaStyle: { color: "#ffffff70" },
        containerStyle: { backgroundColor: "#000", borderRadius: "16px" },
      }}
    />
  );
}
