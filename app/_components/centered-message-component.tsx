import { CenteredMessageProps } from "../_types/centered-message-props";

export default function CenteredMessageComponent({ text }: CenteredMessageProps) {
  return (
    <p className="text-body  flex h-full w-full items-center justify-center py-8">
      {text}
    </p>
  );
}