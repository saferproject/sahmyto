export default function convertDataURLtoFile(dataUrl: string, fileName: string): File {
  const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);

  if (!matches) {
    throw new Error("Invalid data URL format");
  }

  const [, mimeType, base64] = matches;

  const byteString = atob(base64);
  const byteNumbers = Uint8Array.from(byteString, (char) => char.charCodeAt(0));

  return new File([byteNumbers], fileName, {
    type: mimeType,
    lastModified: Date.now(),
  });
}
