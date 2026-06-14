export default function convertFileToDataURL(file: File | Blob) {
  if (!file.type.startsWith("image/")) return '';

  return URL.createObjectURL(file);
}
