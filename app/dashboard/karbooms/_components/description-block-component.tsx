interface DescriptionBlockProps {
  description: string;
}

export default function DescriptionBlock({
  description,
}: DescriptionBlockProps) {
  return (
    <div className="border-secondary mt-4 flex w-full flex-col gap-2 rounded-2xl border border-dashed p-2">
      <p className="text-body-light text-sm">توضیحات ثبت کننده</p>
      <p className="text-body text-sm">{description}</p>
    </div>
  );
}
